import React, { ChangeEvent, ReactElement, RefObject } from 'react';
import {
  styled,
  OutlinedInput,
  InputLabel,
  FormControl,
  SxProps,
  Theme,
} from '@mui/material';
import COLOR from '@styles/colors';

const CssFormControl = styled(FormControl)({
  '& .MuiInputLabel-root': {
    padding: '0 0 0 3px',
    marginTop: '2px',
    fontSize: '1.3rem',
    color: COLOR.GREY.MAIN,
    '&.Mui-focused': {
      color: COLOR.BLUE.MAIN,
    },
  },
  '& .MuiInputBase-root': {
    height: '43px',
    backgroundColor: COLOR.LIGHTGREY,
    borderRadius: 2,
    fontSize: '1.3rem',
    color: COLOR.CHARCOAL,
    '& fieldset': {
      border: `1px solid ${COLOR.GREY.SUB}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${COLOR.GREY.SUB}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${COLOR.BLUE.MAIN}`,
    },
  },
});

const inputStyle = {
  height: '43px',
  padding: '0 0 0 14px',
  WebkitBoxShadow: `0 0 0 1000px ${COLOR.LIGHTGREY} inset`,
  fontSize: '1.3rem',
  color: COLOR.CHARCOAL,
};

interface Props {
  inputRef: RefObject<HTMLInputElement> | null;
  type: 'email' | 'text' | 'password';
  label: string;
  value: string;
  size: 'small' | 'normal' | undefined;
  sx: SxProps<Theme> | undefined;
  endAdornment: JSX.Element | undefined;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  inputRef,
  type,
  label,
  value,
  size,
  sx,
  handleChange,
  endAdornment,
}: Props): ReactElement => {
  return (
    <CssFormControl variant="outlined" sx={{ width: '100%', ...sx }}>
      <InputLabel size={size}>{label}</InputLabel>
      <OutlinedInput
        inputRef={inputRef}
        label={label}
        type={type}
        value={value}
        onChange={handleChange}
        endAdornment={endAdornment}
        inputProps={{
          style: inputStyle,
          autoComplete: 'new-password',
        }}
      />
    </CssFormControl>
  );
};

export default Input;
