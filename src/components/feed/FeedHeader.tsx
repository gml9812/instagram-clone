import React, { ReactElement, useState, MouseEvent } from 'react';
import COLOR from '@styles/colors';
import { Box, IconButton } from '@mui/material';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { User } from 'src/queries/post';
import TextButton from '@components/template/TextButton';
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
        padding: '4px 10px',
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
        <IconButton sx={{ padding: '4px', margin: '0 2px 0 0' }}>
          <AccountCircleIcon
            sx={{ width: '32px', height: '32px', color: COLOR.GREY.SUB }}
          />
        </IconButton>
        <TextButton
          sx={{
            display: 'flex',
            justifyContent: 'start',
            padding: 0,
            fontSize: 13,
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
