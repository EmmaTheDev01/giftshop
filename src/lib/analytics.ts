import { supabase } from './supabase';
import { isSupabaseConfigured } from './api';

export type AnalyticsEventType =
  | 'page_view'
  | 'view_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'search'
  | 'filter_change'
  | 'wishlist_toggle';

/**
 * Tracks an e-commerce interaction event.
 * If Supabase is connected, inserts into the analytics_events table.
 * If not connected, logs cleanly in development mode.
 */
export async function trackEvent(
  eventName: AnalyticsEventType,
  eventData?: Record<string, unknown>
): Promise<void> {
  if (typeof window === 'undefined') return;

  const sessionId = getOrCreateSessionId();

  if (process.env.NODE_ENV === 'development') {
    // Helpful development metric debug
    console.debug(`[Analytics: ${eventName}]`, eventData);
  }

  if (!isSupabaseConfigured()) {
    return;
  }

  try {
    await supabase.from('analytics_events').insert({
      event_name: eventName,
      event_data: eventData || {},
      session_id: sessionId,
      page_url: window.location.href,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    });
  } catch (err) {
    // Non-blocking for UI
    console.warn('Analytics tracking error:', err);
  }
}

/**
 * Logs a system event, warning or audit record into Supabase system_logs.
 */
export async function logSystem(
  level: 'debug' | 'info' | 'warn' | 'error' | 'critical',
  category: string,
  message: string,
  payload?: Record<string, unknown>
): Promise<void> {
  if (!isSupabaseConfigured()) {
    if (level === 'error' || level === 'critical') {
      console.error(`[System Log: ${category}]`, message, payload);
    }
    return;
  }

  try {
    await supabase.from('system_logs').insert({
      level,
      category,
      message,
      payload: payload || {},
    });
  } catch {
    // Non-blocking
  }
}

function getOrCreateSessionId(): string {
  try {
    const KEY = 'gs_session_id';
    let sid = window.sessionStorage.getItem(KEY);
    if (!sid) {
      sid = `ses_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      window.sessionStorage.setItem(KEY, sid);
    }
    return sid;
  } catch {
    return 'ses_fallback';
  }
}
