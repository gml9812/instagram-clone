import { useRef } from 'react';

function useAutoScroll() {
  const elementsRef = useRef(new Map());
  const scrollToElement = (id: number | string) => {
    elementsRef.current.get(id).scrollIntoView({
      behavior: 'auto',
      block: 'center',
    });
  };

  return {
    scrollToElement,
    setRef: (id: number | string) => ({
      ref: (el: any) => elementsRef.current.set(id, el),
    }),
    elementsRef,
  };
}

export default useAutoScroll;
