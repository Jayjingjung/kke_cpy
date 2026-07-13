export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return;

  const localePath = useLocalePath();
  const stored = localStorage.getItem('auth');
  if (!stored) {
    return navigateTo(localePath('/admin/login'));
  }
  try {
    const data = JSON.parse(stored);
    if (!data.accessToken) {
      return navigateTo(localePath('/admin/login'));
    }
  } catch {
    return navigateTo(localePath('/admin/login'));
  }
});
