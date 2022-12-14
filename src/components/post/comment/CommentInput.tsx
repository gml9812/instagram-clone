import React, { ChangeEvent, KeyboardEvent, RefObject } from 'react';
import RoundedInput from '@components/template/RoundedInput';
import TextButton from '@components/template/TextButton';
import { Box, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import COLOR from '@styles/colors';
import ProfileButton from '@components/template/ProfileButton';
import { Comment } from '@queries/comment';
import { useRecoilValue } from 'recoil';
import { UserAtomState, userState } from 'src/recoil/userAtom';

interface Props {
  inputRef: RefObject<HTMLInputElement> | null;
  inputValue: string;
  parentComment: Comment | null;
  handleClickCancelReply: () => void;
  handleChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClickSubmit: () => void;
}

const CommentInput = ({
  inputRef,
  inputValue,
  parentComment,
  handleClickCancelReply,
  handleChangeInput,
  handleClickSubmit,
}: Props) => {
  const user: UserAtomState = useRecoilValue(userState);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      handleClickSubmit();
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          bottom: 'calc(env(safe-area-inset-bottom) + 0px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          borderTop: `0.5px solid ${COLOR.GREY.SUB}`,
          background: `${COLOR.BG}`,
        }}
      >
        {parentComment && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              alignItems: 'center',
              padding: '3px 14px 3px 20px',
              width: '100%',
              height: '40px',
              background: COLOR.LIGHTGREY,
              borderBottom: `0.5px solid ${COLOR.GREY.SUB}`,
              fontSize: '1rem',
              color: COLOR.GREY.MAIN,
            }}
          >
            {parentComment.user.nickname}????????? ?????? ????????? ???
            <IconButton
              sx={{ padding: '4px' }}
              onClick={handleClickCancelReply}
            >
              <CloseRoundedIcon
                sx={{ width: '18', height: '18', color: COLOR.CHARCOAL }}
              />
            </IconButton>
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '5px 16px 5px 8px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <ProfileButton
            user={user}
            sx={{ margin: '0 2px 0 0' }}
            gap={4}
            size={45}
            borderBoxSize={37}
            disableButtonClick
          />

          <RoundedInput
            sx={{ imeMode: 'auto' }}
            value={inputValue}
            inputRef={inputRef}
            handleChange={event => {
              handleChangeInput(event);
            }}
            handleKeyDown={handleKeyDown}
            endAdornment={
              inputValue === '' ? undefined : (
                <TextButton
                  sx={{
                    margin: 0,
                    padding: 0,
                    fontSize: '1.2rem',
                    color: COLOR.BLUE.MAIN,
                  }}
                  onClick={handleClickSubmit}
                >
                  ??????
                </TextButton>
              )
            }
          />
        </Box>
      </Box>

      <Box sx={{ height: '65px' }} />
    </>
  );
};

export default CommentInput;
