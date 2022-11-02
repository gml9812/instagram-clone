import React, { ChangeEvent, RefObject, useEffect, useState } from 'react';
import RoundedInput from '@components/template/RoundedInput';
import TextButton from '@components/template/TextButton';
import { Box } from '@mui/material';
import COLOR from '@styles/colors';
import BorderProfileButton from '@components/template/BorderProfileButton';
import { parseCookies } from 'nookies';
import { CookiesName } from '@libs/values';
import { User } from '@queries/auth';

interface Props {
  inputRef: RefObject<HTMLInputElement> | null;
}

const CommentInput = ({ inputRef }: Props) => {
  const cookies = parseCookies();
  const user = cookies[CookiesName.user];
  const [loggedInUser, setLoggedInUser] = useState<User>({
    id: 0,
    nickname: '',
    profileImage: '',
  });
  useEffect(() => {
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, [user]);

  const [value, setValue] = useState<string>('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 'calc(env(safe-area-inset-bottom) + 0px)',
          display: 'flex',
          justifyContent: 'center',
          boxSizing: 'border-box',
          alignItems: 'center',
          padding: '0 16px 0 8px',
          width: '100%',
          height: '65px',
          borderTop: `0.5px solid ${COLOR.GREY.SUB}`,
          background: `${COLOR.BG}`,
        }}
      >
        <BorderProfileButton
          profileImage={
            loggedInUser.profileImage !== ''
              ? loggedInUser.profileImage
              : undefined
          }
          sx={{ margin: '0 2px 0 0' }}
          size={45}
          borderBoxSize={37}
          gap={4}
        />

        <RoundedInput
          inputRef={inputRef}
          value={value}
          handleChange={event => {
            handleChange(event);
          }}
          sx={{}}
          endAdornment={
            value === '' ? undefined : (
              <TextButton
                sx={{
                  margin: 0,
                  padding: 0,
                  minWidth: 'max-content',
                  fontSize: '1.2rem',
                  color: COLOR.BLUE.MAIN,
                }}
              >
                게시
              </TextButton>
            )
          }
        />
      </Box>

      <Box sx={{ height: '65px' }} />
    </>
  );
};

export default CommentInput;
