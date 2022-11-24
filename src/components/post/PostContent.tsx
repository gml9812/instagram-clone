import HtmlText from '@components/feed/HtmlText';
import ProfileButton from '@components/template/ProfileButton';
import { ago } from '@libs/moment';
import { Box } from '@mui/material';
import { User } from '@queries/auth';
import COLOR from '@styles/colors';
import React from 'react';

interface Props {
  user: User;
  description: string;
  createdAt: string;
}

const PostContent = ({ user, description, createdAt }: Props) => {
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
          alignItems: 'flex-start',
        }}
      >
        <ProfileButton
          user={user}
          sx={{ margin: '0 2px 0 0' }}
          gap={3}
          size={32}
          borderBoxSize={26}
          disableButtonClick={false}
        />

        <Box sx={{ padding: '4px 0 0' }}>
          <HtmlText
            sx={{}}
            nickname={user.nickname}
            description={description}
            showAllDescription
          />

          <Box
            sx={{
              display: 'flex',
              fontSize: '1rem',
              color: COLOR.GREY.MAIN,
              lineHeight: '18px',
            }}
          >
            {ago(createdAt)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostContent;
