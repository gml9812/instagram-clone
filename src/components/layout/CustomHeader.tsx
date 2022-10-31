import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import COLOR from '@styles/colors';
import { Container, Box } from '@mui/material';

interface Props {
  headerIcon: JSX.Element | undefined;
  leftButton: JSX.Element | undefined;
  rightButton: JSX.Element | undefined;
}

export const HEADER_HEIGHT = 54;

const CustomHeader = ({
  headerIcon,
  leftButton,
  rightButton,
}: Props): ReactElement => {
  const [isHeaderBottomStyle, setIsHeaderBottomStyle] =
    useState<boolean>(false);

  const handScroll = useCallback(() => {
    const windowTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (windowTop + 48.5 > HEADER_HEIGHT) {
      setIsHeaderBottomStyle(true);
    } else {
      setIsHeaderBottomStyle(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === undefined) {
      return undefined;
    }
    window.addEventListener('scroll', handScroll);
    return () => window.removeEventListener('scroll', handScroll);
  }, [handScroll]);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          padding: '0 10px 0 12px',
          width: '100%',
          height: `${HEADER_HEIGHT}px`,
          background: COLOR.BG,
          borderBottom: `0.5px solid ${
            isHeaderBottomStyle ? COLOR.GREY.SUB : COLOR.BG
          }`,
        }}
      >
        {headerIcon}
        <Box>
          {leftButton}
          {rightButton}
        </Box>
      </Box>
      <Container sx={{ height: `${HEADER_HEIGHT}px` }} />
    </>
  );
};
export default CustomHeader;
