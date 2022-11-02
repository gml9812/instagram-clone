import { useMutation, useQuery } from '@apollo/client';
import { setAccessToken } from '@libs/token';
import { CookiesName } from '@libs/values';
import { Box, CircularProgress, List } from '@mui/material';
import { REFRESH_ATOKEN_MUTATION } from '@queries/auth';
import {
  DEFAULT_COMMENT_SIZE,
  GET_POST,
  PostWithComment,
  Comment,
} from '@queries/post';
import COLOR from '@styles/colors';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import CommentContent from './CommentItem';

interface Props {
  postId: number;
  initialComments: Comment[];
  handleClickReply: () => void;
}

const CommentList = ({ postId, initialComments, handleClickReply }: Props) => {
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

  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [lastId, setLastId] = useState<number>(
    initialComments[initialComments.length - 1]?.id || 0,
  );
  const [isInView, setIsInview] = useState<boolean>(false);
  const [isEndData, setIsEndData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchMore, data } = useQuery<{ getPost: PostWithComment }>(GET_POST, {
    variables: {
      id: postId,
      commentPaging: {
        size: DEFAULT_COMMENT_SIZE,
        lastId,
      },
    },
  });

  const onInfiniteScroll = async () => {
    try {
      setIsLoading(true);
      await fetchMore({
        variables: {
          commentPaging: {
            size: DEFAULT_COMMENT_SIZE,
            lastId,
          },
        },
      });
      setIsInview(true);
    } catch {
      const result = await refreshAToken();
      setAccessToken(result.data?.getATokenByRToken || '');
    }
  };

  useEffect(() => {
    if (isInView) {
      if (data && data.getPost.comments.length > 0) {
        const commentsData = data.getPost.comments;
        setLastId(commentsData[commentsData.length - 1]?.id);
        setComments(prev => prev.concat(commentsData));
      }
      if (!data || data.getPost.comments.length < DEFAULT_COMMENT_SIZE) {
        setIsEndData(true);
      }
      setIsLoading(false);
      setIsInview(false);
    }
  }, [isInView, data]);

  return (
    <>
      {comments.map(comment => {
        const { id } = comment;
        return (
          <List
            id={`comment-${id}`}
            key={`comment-${id}`}
            sx={{ padding: '8px 0' }}
          >
            <CommentContent {...comment} handleClickReply={handleClickReply} />
          </List>
        );
      })}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '20px',
          color: COLOR.GREY.SUB,
        }}
      >
        {isLoading && !isEndData && (
          <CircularProgress size={20} color="inherit" />
        )}
      </Box>

      {data && data.getPost.comments && (
        <InView
          onChange={async inView => {
            if (inView && !isEndData) {
              onInfiniteScroll();
            }
          }}
        />
      )}
    </>
  );
};

export default CommentList;
