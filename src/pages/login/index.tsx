import { NextPage } from 'next';
import { ChangeEvent, useState, useRef } from 'react';
import Logo from '@icons/Logo';
import { Box, Container, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@components/login/Button';
import Input from '@components/login/Input';
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

  return (
    <Container sx={{ width: '80%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '117px 0 50px',
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
        sx={{ margin: '0 0 12px' }}
        handleChange={handleChange('email')}
        endAdornment={
          values.email ? (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleClickDeleteValue('email')}
                edge="end"
              >
                <CancelIcon sx={{ color: COLOR.GREY.MAIN }} />
              </IconButton>
            </InputAdornment>
          ) : undefined
        }
      />

      <Input
        inputRef={passwordRef}
        type={values.showPassword ? 'text' : 'password'}
        label="비밀번호"
        value={values.password}
        size="small"
        sx={undefined}
        handleChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end" sx={{ gap: '4px' }}>
            {values.password && (
              <IconButton
                onClick={() => handleClickDeleteValue('password')}
                edge="end"
              >
                <CancelIcon sx={{ color: COLOR.GREY.MAIN }} />
              </IconButton>
            )}
            <IconButton onClick={handleClickShowPassword} edge="end">
              {values.showPassword ? (
                <VisibilityOff sx={{ color: COLOR.GREY.MAIN }} />
              ) : (
                <Visibility sx={{ color: COLOR.GREY.MAIN }} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />

      <Button
        label="로그인"
        disabled={!(values.email && values.password)}
        size="large"
        sx={{ margin: '60px 0 0' }}
        handleClick={undefined}
      />
    </Container>
  );
};

export default Login;
