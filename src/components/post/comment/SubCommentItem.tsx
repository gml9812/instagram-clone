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
  handleClickDeleteSubComment: (subCommentId: number) => Promise<void>;
}

const SubCommentItem = ({
  id,
  user,
  description,
  createdAt,
  isLike,
  isMine,
  likeCount,
  handleClickDeleteSubComment,
}: Props) => {
  const router = useRouter();

  const [likeState, setLikeState] = useState<{
    isLike: boolean;
    count: number;
  }>({ isLike, count: likeCount });
  const [createLike] = useMutation<{ createLike: boolean }>(CREATE_LIKE, {
    variables: { likeInput: { itemId: id, type: 'SUB_COMMENT' } },
  });
  const [deleteLike] = useMutation<{ deleteLike: boolean }>(DELETE_LIKE, {
    variables: { likeInput: { itemId: id, type: 'SUB_COMMENT' } },
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
                onClick={() => router.push(`/like/${id}?type=comment`)}
              >
                좋아요 {likeState.count}개
              </TextButton>
            )}

            {isMine && (
              <TextButton
                sx={{
                  margin: '-1px 0 0 18px',
                  padding: 0,
                  fontSize: '1rem',
                  fontWeight: 400,
                  height: '18px',
                }}
                onClick={() => handleClickDeleteSubComment(id)}
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

export default SubCommentItem;
