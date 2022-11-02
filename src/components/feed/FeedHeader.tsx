import React, { ReactElement, useState, MouseEvent } from 'react';
import COLOR from '@styles/colors';
import { Box, IconButton } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { User } from '@queries/auth';
import TextButton from '@components/template/TextButton';
import BorderProfileButton from '@components/template/BorderProfileButton';
import FeedAccordion from './FeedAccordion';

interface Props {
  user: User;
  isMine: boolean;
}

const FeedHeader = ({ user, isMine }: Props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
      >
        <BorderProfileButton
          profileImage={user.profileImage}
          sx={{}}
          size={32}
          borderBoxSize={26}
          gap={3}
        />

        <TextButton
          sx={{
            display: 'flex',
            justifyContent: 'start',
            padding: 0,
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
        anchorEl={anchorEl}
        isOpen={isOpen}
        isMine={isMine}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default FeedHeader;
