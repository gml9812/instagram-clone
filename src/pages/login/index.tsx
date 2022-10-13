import { NextPage } from 'next';
import { MouseEvent, ChangeEvent, useState, useRef } from 'react';
import Logo from '@icons/Logo';
import { Box, Container, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@components/templates/Button';
import Input from '@components/templates/Input';
import COLOR from '@styles/colors';

export interface LoginState {
  email: string;
  password: string;
  showPassword: boolean;
}

const Login: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<LoginState>({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange =
    (key: keyof LoginState) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [key]: event.target.value });
    };

  const handleClickDeleteValue = (key: keyof LoginState) => {
    setValues({ ...values, [key]: '' });
    if (key === 'email') {
      emailRef.current?.focus();
    } else if (key === 'password') {
      passwordRef.current?.focus();
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
    passwordRef.current?.focus();
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container sx={{ width: '80%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '40% 0 20%',
        }}
      >
        <Logo />
      </Box>

      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          margin: '0 0 28px',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            borderBottom: 1,
            color: COLOR.GREY.SUB,
            top: '5px',
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: '60px',
            backgroundColor: COLOR.BG,
          }}
        >
          <Box
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: COLOR.GREY.MAIN,
            }}
          >
            로그인
          </Box>
        </Box>
      </Box>

      <Input
        inputRef={emailRef}
        type="email"
        label="이메일"
        value={values.email}
        size="small"
        margin="0 0 12px"
        handleChange={handleChange('email')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => handleClickDeleteValue('email')}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.email ? <CancelIcon /> : undefined}
            </IconButton>
          </InputAdornment>
        }
      />

      <Input
        inputRef={passwordRef}
        type={values.showPassword ? 'text' : 'password'}
        label="비밀번호"
        value={values.password}
        size="small"
        margin="none"
        handleChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end" sx={{ gap: '2px' }}>
            <IconButton
              onClick={() => handleClickDeleteValue('password')}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.password ? <CancelIcon /> : undefined}
            </IconButton>
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />

      <Button
        label="로그인"
        disabled={!(values.email && values.password)}
        size="large"
        handleClick={undefined}
      />
    </Container>
  );
};

export default Login;
