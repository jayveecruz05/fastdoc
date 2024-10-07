export default () => {
  const viewport = useViewport();
  return {
    breakpoint: viewport.breakpoint,
    mobileView: computed(() => (viewport.matches('mobile', 'mobileMedium', 'mobileWide'))),
    mobileOrTabletView: computed(() => (viewport.matches('mobile', 'mobileMedium', 'mobileWide', 'tablet'))),
    tabletView: computed(() => (viewport.match('tablet'))),
    tabletOrDesktopView: computed(() => (viewport.isGreaterOrEquals('tablet'))),
    desktopView: computed(() => (viewport.isGreaterOrEquals('desktop')))
  };
};