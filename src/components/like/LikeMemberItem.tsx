import ProfileButton from '@components/template/ProfileButton';
import PlaneIcon from '@icons/PlaneIcon';
import { Box, IconButton } from '@mui/material';
import { LikeItem } from '@queries/like';
import COLOR from '@styles/colors';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { UserAtomState, userState } from 'src/recoil/userAtom';

interface Props {
  item: LikeItem;
}

const LikeMemberItem = ({ item }: Props) => {
  const router = useRouter();
  const loginUser: UserAtomState = useRecoilValue(userState);

  const { user } = item;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={() => router.push(`/user/${item.user.id}`)}
      >
        <ProfileButton
          user={user}
          sx={{ margin: '0 2px 0 0' }}
          gap={5}
          size={55}
          borderBoxSize={45}
          disableButtonClick
        />

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              padding: '0 4px 2px',
              fontSize: '1.2rem',
              fontWeight: 700,
              color: COLOR.CHARCOAL,
            }}
          >
            {user.nickname}
          </Box>
          <Box
            sx={{
              padding: '0 4px',
              fontSize: '1.1rem',
              fontWeight: 400,
              color: COLOR.GREY.MAIN,
            }}
          >
            {user.name}
          </Box>
        </Box>
      </Box>

      {loginUser.id !== user.id && (
        <IconButton>
          <PlaneIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default LikeMemberItem;
