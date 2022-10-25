import React, { ReactElement } from 'react';
import {
  createTheme,
  SxProps,
  Theme,
  ThemeProvider,
} from '@mui/material/styles';
import {
  styled,
  Button as MuiButton,
  buttonClasses,
  CircularProgress,
} from '@mui/material';
import COLOR from '@styles/colors';

const CssButton = styled(MuiButton)({
  width: '100%',
  height: '40px',
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
  loading: boolean;
  size: 'small' | 'medium' | 'large';
  sx: SxProps<Theme> | undefined;
  handleClick: (() => void) | undefined;
}

const Button = ({
  label,
  disabled,
  loading,
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
        {loading ? <CircularProgress size={20} color="inherit" /> : label}
      </CssButton>
    </ThemeProvider>
  );
};

export default Button;
