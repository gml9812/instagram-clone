import ProfileButton from '@components/template/ProfileButton';
import { Box } from '@mui/material';
import { LikeItem } from '@queries/post';
import COLOR from '@styles/colors';
import React from 'react';

interface Props {
  item: LikeItem;
}

const LikeMemberItem = ({ item }: Props) => {
  const { user } = item;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
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
  );
};

export default LikeMemberItem;
