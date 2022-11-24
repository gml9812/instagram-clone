import React, { ReactElement, useState, MouseEvent } from 'react';
import COLOR from '@styles/colors';
import { Box, IconButton } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { User } from '@queries/auth';
import TextButton from '@components/template/TextButton';
import ProfileButton from '@components/template/ProfileButton';
import { useRouter } from 'next/router';
import FeedAccordion from './FeedAccordion';

interface Props {
  postId: number;
  user: User;
  isMine: boolean;
  handleClickDeletePost: (postId: number) => Promise<void>;
}

const FeedHeader = ({
  postId,
  user,
  isMine,
  handleClickDeletePost,
}: Props): ReactElement => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileClick = () => {
    router.push(`/user/${user.id}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 10px 4px 6px',
        borderBottom: `0.5px solid ${COLOR.GREY.SUB}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: 0,
        }}
        onClick={handleProfileClick}
      >
        <ProfileButton
          user={user}
          sx={{}}
          gap={3}
          size={32}
          borderBoxSize={26}
          disableButtonClick
        />

        <TextButton
          sx={{
            display: 'flex',
            justifyContent: 'start',
            padding: '0 4px',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: COLOR.CHARCOAL,
          }}
        >
          {user.nickname}
        </TextButton>
      </Box>
      <IconButton sx={{ padding: '4px' }} onClick={handleClick}>
        <MoreHorizRoundedIcon
          sx={{ width: '24px', height: '24px', color: COLOR.CHARCOAL }}
        />
      </IconButton>

      <FeedAccordion
        postId={postId}
        userId={user.id}
        isOpen={isOpen}
        isMine={isMine}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleClickDeletePost={handleClickDeletePost}
      />
    </Box>
  );
};

export default FeedHeader;
