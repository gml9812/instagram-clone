import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState, useRef, useEffect } from 'react';
import Logo from '@icons/Logo';
import { Box, Container, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@components/template/LoadingButton';
import OutlinedInput from '@components/template/OutlinedInput';
import COLOR from '@styles/colors';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, LoginUser } from 'src/queries/auth';
import { CookiesName } from '@libs/values';
import { parseCookies } from 'nookies';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  setUser,
} from '@libs/token';

export interface LoginState {
  email: string;
  password: string;
  showPassword: boolean;
  isFailed: boolean;
}

const Login: NextPage = () => {
  const router = useRouter();
  const cookies = parseCookies();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [values, setValues] = useState<LoginState>({
    email: '',
    password: '',
    showPassword: false,
    isFailed: false,
  });

  const [login, { loading, error, data }] = useMutation<LoginUser>(
    LOGIN_MUTATION,
    {
      variables: { email: values.email, password: values.password },
    },
  );

  const handleChange =
    (key: keyof LoginState) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [key]: event.target.value, isFailed: false });
    };

  const handleClickDeleteValue = (key: keyof LoginState) => {
    setValues({ ...values, [key]: '', isFailed: false });
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

  const handleClickLogin = async () => {
    try {
      await login();
    } catch {
      setValues({ ...values, isFailed: true });
    }
  };

  useEffect(() => {
    const backUrl = cookies[CookiesName.backUrl] || '/';
    if (data) {
      const { accessToken, refreshToken, user } = data.login;
      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      router.push(backUrl);
    }
  }, [cookies, data, router]);

  useEffect(() => {
    if (error) {
      if (error.message.includes('아이디' || '비밀번호')) {
        setErrorMessage('이메일과 비밀번호를 다시 확인해주세요.');
      }
    } else {
      setErrorMessage('로그인할 수 없습니다. 관리자에게 문의해주세요.');
    }
  }, [error]);

  return (
    <Container sx={{ width: '85%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '117px 0 50px',
        }}
      >
        <Logo width={176} height={51} />
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
              fontSize: '1.2rem',
              fontWeight: 600,
              color: COLOR.GREY.MAIN,
            }}
          >
            로그인
          </Box>
        </Box>
      </Box>

      <OutlinedInput
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

      <OutlinedInput
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

      {values.isFailed && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            margin: '14px 0 26px',
            lineHeight: '20px',
            fontSize: '1.2rem',
            fontWeight: 400,
            color: COLOR.RED,
          }}
        >
          {errorMessage}
        </Box>
      )}

      <LoadingButton
        label="로그인"
        disabled={!(values.email && values.password)}
        loading={loading}
        size="large"
        sx={{ margin: `${values.isFailed ? '0' : '60px 0 0'}` }}
        handleClick={handleClickLogin}
      />
    </Container>
  );
};

export default Login;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const accessToken = getAccessToken(context);
  const refreshToken = getRefreshToken(context);

  if (accessToken && refreshToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
