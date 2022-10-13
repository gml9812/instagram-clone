import React, { ReactElement } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled, Button as MuiButton, buttonClasses } from '@mui/material';
import COLOR from '@styles/colors';

const CssButton = styled(MuiButton)({
  margin: '25% 0 0',
  width: '100%',
  background: COLOR.BLUE.MAIN,
  boxShadow: 'none',
  border: 'none',
  borderRadius: 2,
  fontSize: '1.3rem',
  fontWeight: 600,
  color: COLOR.BG,
  '&:hover': {
    background: COLOR.BLUE.MAIN,
  },
});

const theme = createTheme({
  palette: {
    action: {
      disabledBackground: '',
      disabled: COLOR.BG,
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          [`&.${buttonClasses.disabled}`]: {
            background: COLOR.BLUE.SUB,
          },
        },
      },
    },
  },
});

interface Props {
  label: string;
  disabled: boolean;
  size: 'small' | 'medium' | 'large';
  handleClick: (() => void) | undefined;
}

const Button = ({
  label,
  disabled,
  size,
  handleClick,
}: Props): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <CssButton
        disabled={disabled}
        disableElevation
        variant="contained"
        size={size}
        onClick={handleClick}
      >
        {label}
      </CssButton>
    </ThemeProvider>
  );
};

export default Button;
