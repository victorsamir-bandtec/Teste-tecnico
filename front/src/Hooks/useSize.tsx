import { useCallback, useEffect, useState } from 'react';

const useSize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 768);
  const [isLarge, setIsLarge] = useState(window.innerWidth <= 992);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [windowInnerHeight, setWindowInnerHeight] = useState(
    window.innerHeight
  );

  const handleWindowResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 576);
    setIsTablet(window.innerWidth <= 768);
    setIsLarge(window.innerWidth <= 992);

    setWindowInnerWidth(window.innerWidth);
    setWindowInnerHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);

  return { isMobile, isTablet, isLarge, windowInnerWidth, windowInnerHeight };
};

export default useSize;
