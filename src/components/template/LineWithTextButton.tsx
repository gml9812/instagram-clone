import { Box, SxProps, Theme } from '@mui/material';
import COLOR from '@styles/colors';
import React from 'react';
import TextButton from './TextButton';

interface Props {
  sx: SxProps<Theme> | undefined;
  buttonText: string;
  handleClick: () => void;
}

const LineWithTextButton = ({ sx, buttonText, handleClick }: Props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Box
        sx={{
          width: '20px',
          height: '1px',
          background: COLOR.GREY.SUB,
        }}
      />
      <TextButton
        sx={{
          minWidth: 'max-content',
          padding: '0 8px',
          fontSize: '1rem',
          fontWeight: 400,
          height: '18px',
        }}
        onClick={handleClick}
      >
        {buttonText}
      </TextButton>
    </Box>
  );
};

export default LineWithTextButton;
