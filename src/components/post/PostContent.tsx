import HtmlText from '@components/feed/HtmlText';
import BorderProfileButton from '@components/template/BorderProfileButton';
import { ago } from '@libs/moment';
import { Box } from '@mui/material';
import { User } from '@queries/auth';
import COLOR from '@styles/colors';
import React from 'react';

interface Props {
  user: User;
  description: string;
  modifiedAt: string;
}

const PostContent = ({ user, description, modifiedAt }: Props) => {
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
        <BorderProfileButton
          profileImage={user.profileImage}
          sx={{ margin: '0 2px 0 0' }}
          size={32}
          borderBoxSize={26}
          gap={3}
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
              fontWeight: 400,
              color: COLOR.GREY.MAIN,
              lineHeight: '18px',
            }}
          >
            {ago(modifiedAt)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostContent;
