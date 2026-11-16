const API_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export type HealthResponse = { status: string };

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: { Accept: 'application/json', ...init?.headers },
    });
  } catch (cause) {
    throw new ApiError(`Could not reach API at ${API_URL}: ${String(cause)}`);
  }
  if (!res.ok) throw new ApiError(`${res.status} ${res.statusText}`, res.status);
  return (await res.json()) as T;
}

export const api = {
  health: () => request<HealthResponse>('/health'),
};
