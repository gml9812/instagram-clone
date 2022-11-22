import { Button, ButtonProps, styled } from '@mui/material';
import COLOR from '@styles/colors';
import React from 'react';

const CssButton = styled(Button)({
  display: 'flex',
  color: COLOR.GREY.MAIN,
  textTransform: 'none',
});

const TextButton = ({ sx, children, onClick }: ButtonProps) => {
  return (
    <CssButton sx={{ minWidth: 'max-content', ...sx }} onClick={onClick}>
      {children}
    </CssButton>
  );
};

export default TextButton;
