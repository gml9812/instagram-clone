import React, { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import { Input, styled, SxProps, Theme } from '@mui/material';
import COLOR from '@styles/colors';

interface Props {
  sx: SxProps<Theme> | undefined;
  value: string;
  inputRef: RefObject<HTMLInputElement> | null;
  endAdornment: JSX.Element | undefined;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const CssInput = styled(Input)({
  width: '100%',
  border: `1px solid ${COLOR.GREY.SUB}`,
  borderRadius: '100px',
  height: '40px',
  padding: '10px 18px',
  fontSize: '1.2rem',
  color: COLOR.CHARCOAL,
});

const RoundedInput = ({
  sx,
  value,
  inputRef,
  endAdornment,
  handleChange,
  handleKeyDown,
}: Props) => {
  return (
    <CssInput
      inputRef={inputRef}
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disableUnderline
      endAdornment={endAdornment}
      sx={{ ...sx }}
    />
  );
};

export default RoundedInput;
