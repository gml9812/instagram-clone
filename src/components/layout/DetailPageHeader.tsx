import { Box, Container, IconButton, AppBar } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import COLOR from '@styles/colors';
import React from 'react';
import { useRouter } from 'next/router';

interface Props {
  pageName: string;
}

const DETAIL_HEADER_HEIGHT = 44;

const DetailPageHeader = ({ pageName }: Props) => {
  const router = useRouter();
  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          position: 'fixed',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          width: '100%',
          height: `${DETAIL_HEADER_HEIGHT}px`,
          background: COLOR.BG,
          borderBottom: `0.5px solid ${COLOR.GREY.SUB}`,
        }}
      >
        <IconButton
          sx={{ position: 'fixed', left: '0', margin: '0 0 1px' }}
          onClick={() => router.back()}
        >
          <ArrowBackIosRoundedIcon
            sx={{ width: '20px', height: '20px', color: COLOR.CHARCOAL }}
          />
        </IconButton>

        <Box
          sx={{
            fontSize: '1.4rem',
            fontWeight: 600,
            color: COLOR.CHARCOAL,
            lineHeight: '20px',
          }}
        >
          {pageName}
        </Box>
      </AppBar>
      <Container sx={{ height: `${DETAIL_HEADER_HEIGHT}px` }} />
    </>
  );
};

export default DetailPageHeader;
