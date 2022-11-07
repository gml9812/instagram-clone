import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { parseCookies } from 'nookies';
import { InView } from 'react-intersection-observer';
import { useMutation, useQuery } from '@apollo/client';
import { REFRESH_ATOKEN_MUTATION } from '@queries/auth';
import { setAccessToken } from '@libs/token';
import { CookiesName } from '@libs/values';
import { Box, CircularProgress, List } from '@mui/material';
import {
  DEFAULT_COMMENT_SIZE,
  GET_POST,
  PostWithComment,
  Comment,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from '@queries/post';
import COLOR from '@styles/colors';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';

interface Props {
  postId: number;
  initialComments: Comment[];
}

const CommentList = ({ postId, initialComments }: Props) => {
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

  const inputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    inputRef.current?.focus();
  };
  const [inputValue, setInputValue] = useState<string>('');
  const resetValue = () => {
    setInputValue('');
  };
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [createComment] = useMutation<{ createComment: Comment }>(
    CREATE_COMMENT,
  );
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const handleClickDeleteComment = async (commentId: number) => {
    try {
      await deleteComment({ variables: { id: commentId } });
      const updatedComments = comments.filter(
        comment => comment.id !== commentId,
      );
      setComments(updatedComments);
    } catch {
      const result = await refreshAToken();
      setAccessToken(result.data?.getATokenByRToken || '');
    }
  };

  const [parentComment, setParentComment] = useState<Comment | null>(null);
  const handleClickReply = (comment: Comment) => {
    focusInput();
    setParentComment(comment);
    resetValue();
  };
  const handleClickCancelReply = () => {
    focusInput();
    setParentComment(null);
    resetValue();
  };

  const handleClickSubmit = async () => {
    if (inputValue !== '') {
      try {
        const result = await createComment({
          variables: {
            postId,
            description: inputValue,
          },
        });
        if (result.data) {
          const newCommentData = result.data.createComment || {};
          setComments(prev => [newCommentData, ...prev]);
          resetValue();
        }
      } catch {
        const result = await refreshAToken();
        setAccessToken(result.data?.getATokenByRToken || '');
      }
    }
  };

  return (
    <>
      {comments.map(comment => {
        const { id } = comment;
        return (
          <List
            id={`comment-${id}`}
            key={`comment-${id}`}
            sx={{ padding: '8px' }}
          >
            <CommentItem
              {...comment}
              handleClickReply={handleClickReply}
              handleClickDeleteComment={handleClickDeleteComment}
            />
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

      <CommentInput
        inputRef={inputRef}
        inputValue={inputValue}
        parentComment={parentComment}
        handleClickCancelReply={handleClickCancelReply}
        handleChangeInput={handleChangeInput}
        handleClickSubmit={handleClickSubmit}
      />
    </>
  );
};

export default CommentList;
