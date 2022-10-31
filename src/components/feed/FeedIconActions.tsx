import React, { ReactElement } from 'react';
import { Box, IconButton } from '@mui/material';
import LikeIcon from '@icons/LikeIcon';
import CommentIcon from '@icons/CommentIcon';
import COLOR from '@styles/colors';
import TextButton from '@components/template/TextButton';

interface Props {
  isLike: boolean;
  likeCount: number;
}

const FeedActions = ({ isLike, likeCount }: Props): ReactElement => {
  return (
    <>
      <Box sx={{ padding: '4px 8px' }}>
        <IconButton sx={{ padding: '8px', margin: '0 4px 0 0' }}>
          <LikeIcon isLike={isLike} />
        </IconButton>
        <IconButton sx={{ padding: '8px' }}>
          <CommentIcon />
        </IconButton>
      </Box>

      {likeCount !== 0 && (
        <TextButton
          sx={{
            display: 'flex',
            justifyContent: 'start',
            padding: 0,
            margin: '0 16px 2px',
            fontSize: 13,
            fontWeight: 400,
            color: COLOR.CHARCOAL,
            lineHeight: '20px',
          }}
        >
          좋아요
          <Box sx={{ margin: '0 0 0 4px', fontWeight: 700 }}>{likeCount}</Box>개
        </TextButton>
      )}
    </>
  );
};

export default FeedActions;
