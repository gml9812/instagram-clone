import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import LikeIcon from '@icons/LikeIcon';
import CommentIcon from '@icons/CommentIcon';
import COLOR from '@styles/colors';
import TextButton from '@components/template/TextButton';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_LIKE, DELETE_LIKE } from '@queries/like';

interface Props {
  id: number;
  isLike: boolean;
  likeCount: number;
}

const FeedIconActions = ({ id, isLike, likeCount }: Props) => {
  const router = useRouter();

  const [likeState, setLikeState] = useState<{
    isLike: boolean;
    count: number;
  }>({ isLike, count: likeCount });

  const [createLike] = useMutation<{ createLike: boolean }>(CREATE_LIKE, {
    variables: { likeInput: { itemId: id, type: 'POST' } },
  });
  const [deleteLike] = useMutation<{ deleteLike: boolean }>(DELETE_LIKE, {
    variables: { likeInput: { itemId: id, type: 'POST' } },
  });

  const handleClickLike = async () => {
    if (!likeState.isLike) {
      createLike();
      setLikeState({ isLike: true, count: likeState.count + 1 });
    } else {
      deleteLike();
      setLikeState({ isLike: false, count: likeState.count - 1 });
    }
  };

  const handleClickComment = () => {
    router.push(`/comments/${id}`);
  };

  return (
    <>
      <Box sx={{ padding: '4px 8px' }}>
        <IconButton
          sx={{ padding: '8px', margin: '0 4px 0 0' }}
          onClick={handleClickLike}
        >
          <LikeIcon
            isLike={likeState.isLike}
            strokeColor={undefined}
            strokeWidth={undefined}
          />
        </IconButton>
        <IconButton sx={{ padding: '8px' }} onClick={handleClickComment}>
          <CommentIcon />
        </IconButton>
      </Box>

      {likeState.count !== 0 && (
        <TextButton
          sx={{
            display: 'flex',
            justifyContent: 'start',
            padding: 0,
            margin: '0 16px 2px',
            fontSize: '1.1rem',
            fontWeight: 500,
            color: COLOR.CHARCOAL,
            lineHeight: '20px',
            letterSpacing: '-0.02em',
          }}
          onClick={() => router.push(`/like/${id}?type=post`)}
        >
          {`좋아요 ${likeState.count}개`}
        </TextButton>
      )}
    </>
  );
};

export default FeedIconActions;
