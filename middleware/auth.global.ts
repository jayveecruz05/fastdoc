export default defineNuxtRouteMiddleware((to) => {
  if (to.matched.length === 0) { return navigateTo({ path: '/' }); } // 404 Redirect to Home Page
  const { accessToken, isFullyLoggedIn } = useCookies();
  // API Authorization
  mainAPI.api.setAuthorization((isFullyLoggedIn.value) ? accessToken.value : null); // Check if the user is logged in and have access token, if yes set API Authorization
  // Navigation Guard
  if (!!to.meta?.requiresAuthentication) { // Check if the page requires authentication
    if (!isFullyLoggedIn.value) { // Check if the user is logged in, if not redirect to login page
      return navigateTo({ path: '/login' });
    }
  } else if (!!to.meta?.notAuthenticated) { // Check if the page should not be authenticated
    if (isFullyLoggedIn.value) { // Check if the user is logged in, if yes redirect to my-profile page
      return navigateTo({ path: '/my-profile' });
    }
  }
  // throw createError({ statusCode: 404, statusMessage: `Page not found: ${to.path}` }); // Example of Throw Route Error
});