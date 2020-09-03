let prevLocation = {};
const routeChangeToTop = history => {
  history.listen(location => {
    // setTimeout(() => {
    //   if (location.action === 'POP') {
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // });

    const pathChanged = prevLocation.pathname !== location.pathname;
    const hashChanged = prevLocation.hash !== location.hash;
    if (pathChanged || hashChanged) window.scrollTo(0, 0);
    prevLocation = location;
  });
};

export default routeChangeToTop;
