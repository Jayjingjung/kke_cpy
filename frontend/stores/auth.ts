import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '' as string,
    refreshToken: '' as string,
    user: null as { id: number; username: string; role: string } | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    isAdmin: (state) => state.user?.role === 'super_admin',
  },
  actions: {
    setTokens(access: string, refresh: string, user: any) {
      this.accessToken = access;
      this.refreshToken = refresh;
      this.user = user;
      if (import.meta.client) {
        localStorage.setItem('auth', JSON.stringify({ accessToken: access, refreshToken: refresh, user }));
      }
    },
    loadFromStorage() {
      if (import.meta.client) {
        const stored = localStorage.getItem('auth');
        if (stored) {
          const data = JSON.parse(stored);
          this.accessToken = data.accessToken;
          this.refreshToken = data.refreshToken;
          this.user = data.user;
        }
      }
    },
    logout() {
      this.accessToken = '';
      this.refreshToken = '';
      this.user = null;
      if (import.meta.client) {
        localStorage.removeItem('auth');
      }
    },
  },
});
