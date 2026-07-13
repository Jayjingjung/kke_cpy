export function useApi() {
  const config = useRuntimeConfig();
  const base = process.server ? config.apiBaseInternal : config.public.apiBase;

  async function get<T = any>(path: string): Promise<T> {
    return await $fetch<T>(`${base}/api/v1${path}`);
  }

  async function authGet<T = any>(path: string, token: string): Promise<T> {
    return await $fetch<T>(`${base}/api/v1${path}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async function authPost<T = any>(path: string, body: any, token: string): Promise<T> {
    return await $fetch<T>(`${base}/api/v1${path}`, {
      method: 'POST',
      body,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async function authPut<T = any>(path: string, body: any, token: string): Promise<T> {
    return await $fetch<T>(`${base}/api/v1${path}`, {
      method: 'PUT',
      body,
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async function authDelete(path: string, token: string): Promise<void> {
    await $fetch(`${base}/api/v1${path}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async function post<T = any>(path: string, body: any): Promise<T> {
    return await $fetch<T>(`${base}/api/v1${path}`, { method: 'POST', body });
  }

  return { get, post, authGet, authPost, authPut, authDelete, base };
}
