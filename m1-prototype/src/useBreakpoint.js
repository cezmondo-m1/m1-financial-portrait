import { useState, useEffect } from 'react';

// M1 Design System breakpoints (grids.md)
const BREAKPOINTS = [
  { name: 'xs', min: 0,    max: 574  },
  { name: 's',  min: 575,  max: 699  },
  { name: 'm',  min: 700,  max: 927  },
  { name: 'l',  min: 928,  max: 1287 },
  { name: 'xl', min: 1288, max: 1619 },
  { name: 'xxl', min: 1620, max: Infinity },
];

function getBreakpoint(width) {
  for (const bp of BREAKPOINTS) {
    if (width >= bp.min && width <= bp.max) return bp.name;
  }
  return 'xxl';
}

export default function useBreakpoint() {
  const [bp, setBp] = useState(() => getBreakpoint(window.innerWidth));

  useEffect(() => {
    function handleResize() {
      setBp(getBreakpoint(window.innerWidth));
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Nav: hidden below 700, collapsed at M/L, open at XL/XXL
  const navMode = (bp === 'xs' || bp === 's') ? 'hidden' : (bp === 'm' || bp === 'l') ? 'collapsed' : 'open';
  const navWidth = navMode === 'open' ? 264 : navMode === 'collapsed' ? 72 : 0;

  // Content padding per breakpoint
  const contentPadding =
    bp === 'xs' ? 16 :
    bp === 's' ? 24 :
    bp === 'm' ? 24 :
    bp === 'l' ? 48 :
    64; // xl, xxl

  // Gutter
  const gutter = (bp === 'xs' || bp === 'm') ? 16 : 24;

  return { bp, navMode, navWidth, contentPadding, gutter };
}
