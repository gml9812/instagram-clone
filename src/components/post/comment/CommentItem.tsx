import React, { useState } from 'react';
import COLOR from '@styles/colors';
import TextButton from '@components/template/TextButton';
import { Box, IconButton } from '@mui/material';
import { Comment, CREATE_LIKE, DELETE_LIKE } from '@queries/post';
import { REFRESH_ATOKEN_MUTATION } from '@queries/auth';
import { ago } from '@libs/moment';
import LikeIcon from '@icons/LikeIcon';
import ProfileButton from '@components/template/ProfileButton';
import HtmlText from '@components/feed/HtmlText';
import { useMutation } from '@apollo/client';
import { parseCookies } from 'nookies';
import { CookiesName } from '@libs/values';
import { setAccessToken } from '@libs/token';
import SubCommentList from './SubCommentList';

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
  isLike: initialLike,
  isMine,
  handleClickReply,
  handleClickDeleteComment,
}: Props) => {
  const cookies = parseCookies();
  const refreshToken = cookies[CookiesName.refreshToken];
  const [refreshAToken] = useMutation<{ getATokenByRToken: string }>(
    REFRESH_ATOKEN_MUTATION,
    {
      context: {
        headers: {
          'R-TOKEN': refreshToken,
        },
      },
    },
  );

  const [isLike, setIsLike] = useState<boolean>(initialLike);
  const [createLike] = useMutation<{ createLike: boolean }>(CREATE_LIKE, {
    variables: { likeInput: { itemId: commentId, type: 'COMMENT' } },
  });
  const [deleteLike] = useMutation<{ deleteLike: boolean }>(DELETE_LIKE, {
    variables: { likeInput: { itemId: commentId, type: 'COMMENT' } },
  });

  const handleClickLike = async () => {
    if (!isLike) {
      setIsLike(true);
      try {
        createLike();
      } catch {
        const result = await refreshAToken();
        setAccessToken(result.data?.getATokenByRToken || '');
      }
    } else {
      setIsLike(false);
      try {
        deleteLike();
      } catch {
        const result = await refreshAToken();
        setAccessToken(result.data?.getATokenByRToken || '');
      }
    }
  };

  const comment = {
    id: commentId,
    user,
    description,
    createdAt,
    isLike: initialLike,
    isMine,
    subCommentCount,
  };

  return (
    <>
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
                color: COLOR.GREY.MAIN,
                lineHeight: '18px',
              }}
            >
              {ago(createdAt)}

              <TextButton
                sx={{
                  minWidth: 'max-content',
                  margin: '-1px 0 0 18px',
                  padding: 0,
                  fontSize: '1rem',
                  height: '18px',
                }}
                onClick={() => handleClickReply(comment)}
              >
                답글 달기
              </TextButton>

              {isMine && (
                <TextButton
                  sx={{
                    minWidth: 'max-content',
                    margin: '-1px 0 0 18px',
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
            isLike={isLike}
            strokeColor={COLOR.GREY.MAIN}
            strokeWidth="1.5"
          />
        </IconButton>
      </Box>

      {!!subCommentCount && (
        <SubCommentList
          commentId={commentId}
          count={subCommentCount}
          handleClickReply={handleClickReply}
        />
      )}
    </>
  );
};

export default CommentItem;
