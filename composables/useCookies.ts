export default () => {
  const isLoggedIn = useCookie<boolean>('isLoggedIn', { sameSite: true });
  const accessToken = useCookie<string | null>('accessToken', { sameSite: true });
  const isFullyLoggedIn = computed<boolean>(() => (!!isLoggedIn.value && !!accessToken.value));
  return {
    isLoggedIn,
    accessToken,
    isFullyLoggedIn
  }
};