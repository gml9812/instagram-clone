import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import COLOR from '@styles/colors';
import { Container, Box, AppBar } from '@mui/material';

interface Props {
  leftButton: JSX.Element | undefined;
  rightButton: JSX.Element | undefined;
}

export const HEADER_HEIGHT = 54;

const CustomHeader = ({ leftButton, rightButton }: Props): ReactElement => {
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
      <AppBar
        elevation={0}
        sx={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'row',
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
        {leftButton}
        <Box>{rightButton}</Box>
      </AppBar>
      <Container sx={{ height: `${HEADER_HEIGHT}px` }} />
    </>
  );
};
export default CustomHeader;
