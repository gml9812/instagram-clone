import React, { ReactElement } from 'react';
import {
  createTheme,
  SxProps,
  Theme,
  ThemeProvider,
} from '@mui/material/styles';
import { styled, Button as MuiButton, buttonClasses } from '@mui/material';
import COLOR from '@styles/colors';

const CssButton = styled(MuiButton)({
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
  sx: SxProps<Theme> | undefined;
  handleClick: (() => void) | undefined;
}

const Button = ({
  label,
  disabled,
  size,
  sx,
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
        sx={{ ...sx }}
      >
        {label}
      </CssButton>
    </ThemeProvider>
  );
};

export default Button;
