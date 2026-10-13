import { supabase } from './supabase';

export interface OptimizedImageResult {
  file: File | Blob;
  previewUrl: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
  compressionRatio: number;
}

/**
 * Client-side image compression and resizing using HTMLCanvasElement.
 * Reduces raw 5-10MB mobile/camera images to high-quality <350KB web images.
 */
export async function optimizeImage(
  file: File,
  maxWidth: number = 1600,
  maxHeight: number = 1600,
  quality: number = 0.85
): Promise<OptimizedImageResult> {
  // If file is SVG or non-image, skip canvas compression
  if (file.type === 'image/svg+xml' || typeof window === 'undefined') {
    return {
      file,
      previewUrl: URL.createObjectURL(file),
      originalSize: file.size,
      compressedSize: file.size,
      width: 0,
      height: 0,
      compressionRatio: 1,
    };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserving dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            maxHeight = height;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({
            file,
            previewUrl: URL.createObjectURL(file),
            originalSize: file.size,
            compressedSize: file.size,
            width,
            height,
            compressionRatio: 1,
          });
          return;
        }

        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP or JPEG
        const outputMime = 'image/webp';
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({
                file,
                previewUrl: URL.createObjectURL(file),
                originalSize: file.size,
                compressedSize: file.size,
                width,
                height,
                compressionRatio: 1,
              });
              return;
            }

            const cleanName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
            const optimizedFile = new File([blob], cleanName, { type: outputMime });
            const previewUrl = URL.createObjectURL(blob);

            resolve({
              file: optimizedFile,
              previewUrl,
              originalSize: file.size,
              compressedSize: blob.size,
              width,
              height,
              compressionRatio: Number((blob.size / file.size).toFixed(2)),
            });
          },
          outputMime,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image for optimization'));
      img.src = readerEvent.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a single image to the Supabase Storage 'products' bucket.
 * Returns public URL.
 */
export async function uploadProductImage(
  file: File | Blob,
  fileNameHint?: string
): Promise<{ success: boolean; url?: string; path?: string; error?: string }> {
  try {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const sanitizedName = (fileNameHint || (file instanceof File ? file.name : 'product-image'))
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '-')
      .replace(/-+/g, '-');
    
    const filePath = `keepsakes/${timestamp}-${randomSuffix}-${sanitizedName}`;

    // Upload to 'products' bucket
    const { data, error } = await supabase.storage
      .from('products')
      .upload(filePath, file, {
        cacheControl: '31536000',
        upsert: true,
      });

    if (error) {
      console.warn('Supabase storage upload error:', error.message);
      return { success: false, error: error.message };
    }

    // Retrieve public URL
    const { data: publicData } = supabase.storage.from('products').getPublicUrl(data.path);
    return {
      success: true,
      url: publicData.publicUrl,
      path: data.path,
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Storage upload failed' };
  }
}

/**
 * Uploads multiple images with optimization, returning an array of public URLs.
 */
export async function uploadMultipleProductImages(
  files: File[],
  onProgress?: (index: number, total: number) => void
): Promise<{ urls: string[]; errors: string[] }> {
  const urls: string[] = [];
  const errors: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    try {
      if (onProgress) onProgress(i, files.length);
      const optimized = await optimizeImage(file);
      const res = await uploadProductImage(optimized.file, file.name);
      if (res.success && res.url) {
        urls.push(res.url);
      } else {
        errors.push(`Failed to upload ${file.name}: ${res.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      errors.push(`Optimization error for ${file.name}: ${err.message}`);
    }
  }

  if (onProgress) onProgress(files.length, files.length);
  return { urls, errors };
}

/**
 * List files in the Supabase 'products' storage bucket.
 */
export async function listProductBucketImages(limit: number = 50): Promise<any[]> {
  try {
    const { data, error } = await supabase.storage
      .from('products')
      .list('keepsakes', {
        limit,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });
    if (error) return [];
    return data || [];
  } catch {
    return [];
  }
}
