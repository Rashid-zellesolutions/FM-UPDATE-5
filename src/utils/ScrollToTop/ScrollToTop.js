import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({children}) => {
    const pathname = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
  return children || null
}

export default ScrollToTop


// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const ScrollRestoration = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     // Save scroll position before navigating away
//     const saveScrollPosition = () => {
//       const currentState = window.history.state || {};
//       window.history.replaceState(
//         { ...currentState, scroll: window.scrollY },
//         ''
//       );
//     };

//     // Restore scroll position when navigating back/forward
//     const restoreScrollPosition = () => {
//       const currentState = window.history.state;
//       const scrollY = currentState?.scroll || 0;
//       window.scrollTo(0, scrollY);
//     };

//     // Handle scroll restoration
//     restoreScrollPosition(); // Restore on initial render
//     window.addEventListener('popstate', restoreScrollPosition); // Listen for back/forward navigation
//     return () => {
//       saveScrollPosition(); // Save when component unmounts
//       window.removeEventListener('popstate', restoreScrollPosition);
//     };
//   }, [pathname]);

//   return null;
// };

// export default ScrollRestoration;
