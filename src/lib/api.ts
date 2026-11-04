import type { LeadPayload, LeadResponse } from '../types';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, '');
const TIMEOUT_MS = 12_000;

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function parseError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string; error?: string };
    return body.message || body.error || `Server xatosi (${response.status})`;
  } catch {
    return `Server xatosi (${response.status})`;
  }
}

/**
 * Backend contract:
 *   POST {VITE_API_URL}/leads
 *   Content-Type: application/json
 *   body: LeadPayload
 *   201 -> { id: string }
 *
 * When VITE_API_URL is not set the frontend runs in demo mode and stores the
 * lead locally so the flow can be tested before the backend is ready.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  if (!API_URL) {
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    try {
      const key = 'bizneslab:leads';
      const previous = JSON.parse(localStorage.getItem(key) || '[]') as unknown[];
      localStorage.setItem(
        key,
        JSON.stringify([...previous, { ...payload, createdAt: new Date().toISOString() }].slice(-20)),
      );
    } catch {
      // Storage can be unavailable in private mode — the demo flow still succeeds.
    }
    return { ok: true, mode: 'demo' };
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${API_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, source: payload.source || 'landing' }),
      signal: controller.signal,
    });

    if (!response.ok) throw new ApiError(await parseError(response), response.status);

    const data = (await response.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id, mode: 'api' };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError("So'rov vaqti tugadi. Internetni tekshirib, qayta urinib ko'ring.");
    }
    if (error instanceof ApiError) throw error;
    throw new ApiError("Serverga ulanib bo'lmadi. Keyinroq qayta urinib ko'ring.");
  } finally {
    window.clearTimeout(timeout);
  }
}
