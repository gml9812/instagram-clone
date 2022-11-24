import React, { useState } from 'react';
import COLOR from '@styles/colors';
import TextButton from '@components/template/TextButton';
import { Box, IconButton } from '@mui/material';
import { Comment } from '@queries/comment';
import { CREATE_LIKE, DELETE_LIKE } from '@queries/like';

import { ago } from '@libs/moment';
import LikeIcon from '@icons/LikeIcon';
import ProfileButton from '@components/template/ProfileButton';
import HtmlText from '@components/feed/HtmlText';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

interface Props extends Comment {
  handleClickReply: (comment: Comment) => void;
  handleClickDeleteComment: (commentId: number) => Promise<void>;
}

const CommentItem = ({
  id: commentId,
  user,
  description,
  subCommentCount = 0,
  createdAt,
  isLike,
  isMine,
  likeCount,
  handleClickReply,
  handleClickDeleteComment,
}: Props) => {
  const router = useRouter();

  const [likeState, setLikeState] = useState<{
    isLike: boolean;
    count: number;
  }>({ isLike, count: likeCount });
  const [createLike] = useMutation<{ createLike: boolean }>(CREATE_LIKE, {
    variables: { likeInput: { itemId: commentId, type: 'COMMENT' } },
  });
  const [deleteLike] = useMutation<{ deleteLike: boolean }>(DELETE_LIKE, {
    variables: { likeInput: { itemId: commentId, type: 'COMMENT' } },
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

  const comment = {
    id: commentId,
    user,
    description,
    createdAt,
    isLike,
    isMine,
    subCommentCount,
    likeCount,
  };

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

            {!!likeState.count && (
              <TextButton
                sx={{
                  margin: '0 0 0 18px',
                  padding: 0,
                  fontSize: '1rem',
                  fontWeight: 400,
                  height: '18px',
                }}
                onClick={() => router.push(`/like/${commentId}?type=comment`)}
              >
                좋아요 {likeState.count}개
              </TextButton>
            )}

            <TextButton
              sx={{
                margin: '0 0 0 18px',
                padding: 0,
                fontSize: '1rem',
                fontWeight: 400,
                height: '18px',
              }}
              onClick={() => handleClickReply(comment)}
            >
              답글 달기
            </TextButton>

            {isMine && (
              <TextButton
                sx={{
                  margin: '0 0 0 18px',
                  padding: 0,
                  fontSize: '1rem',
                  height: '18px',
                }}
                onClick={() => handleClickDeleteComment(commentId)}
              >
                삭제
              </TextButton>
            )}
          </Box>
        </Box>
      </Box>

      <IconButton
        sx={{ padding: '8px', margin: '4px 4px auto 12px', width: '28px' }}
        onClick={handleClickLike}
      >
        <LikeIcon
          isLike={likeState.isLike}
          strokeColor={COLOR.GREY.MAIN}
          strokeWidth="1.5"
        />
      </IconButton>
    </Box>
  );
};

export default CommentItem;
