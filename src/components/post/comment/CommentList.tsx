import React, { ChangeEvent, useRef, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useMutation, useQuery } from '@apollo/client';
import { Box, CircularProgress, List } from '@mui/material';
import { GET_POST } from '@queries/post';
import {
  DEFAULT_COMMENT_SIZE,
  PostWithComment,
  Comment,
  CREATE_COMMENT,
  DELETE_COMMENT,
  CREATE_SUBCOMMENT,
  NewSubComment,
} from '@queries/comment';
import COLOR from '@styles/colors';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import SubCommentList from './SubCommentList';

interface Props {
  postId: number;
  commetCount: number;
  initialComments: Comment[];
}

const CommentList = ({ postId, commetCount, initialComments }: Props) => {
  const initialLastId = initialComments[initialComments.length - 1]?.id;
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [lastId, setLastId] = useState<number | undefined>(
    initialLastId || undefined,
  );
  const [isEndData, setIsEndData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchMore } = useQuery<{ getPost: PostWithComment }>(GET_POST, {
    variables: {
      id: postId,
      commentPaging: {
        size: DEFAULT_COMMENT_SIZE,
        lastId,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const onInfiniteScroll = async () => {
    if (commetCount < DEFAULT_COMMENT_SIZE) {
      setIsLoading(false);
      return;
    }

    const { data } = await fetchMore({
      variables: {
        commentPaging: {
          size: DEFAULT_COMMENT_SIZE,
          lastId,
        },
      },
    });
    const newComments = data.getPost.comments;
    const updatedLastId = newComments[newComments.length - 1]?.id;
    setComments(prev => prev.concat(newComments));
    if (updatedLastId) {
      setLastId(updatedLastId);
    }
    if (!newComments || newComments.length < DEFAULT_COMMENT_SIZE) {
      setIsEndData(true);
    }
    setIsLoading(false);
  };

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
  const [createSubComment] = useMutation<{ createSubComment: Comment }>(
    CREATE_SUBCOMMENT,
  );
  const [newSubComment, setNewSubComment] = useState<NewSubComment | null>(
    null,
  );

  const [deleteComment] = useMutation(DELETE_COMMENT);
  const handleClickDeleteComment = async (commentId: number) => {
    await deleteComment({ variables: { id: commentId } });
    const updatedCommentList = comments.filter(
      comment => Number(comment.id) !== Number(commentId),
    );
    setComments(updatedCommentList);
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
      if (parentComment) {
        const result = await createSubComment({
          variables: {
            postId,
            parentId: parentComment.id,
            description: inputValue,
          },
        });

        if (result.data) {
          const newSubCommentData = result.data.createSubComment;
          setNewSubComment(
            newSubCommentData
              ? {
                  ...newSubCommentData,
                  parentId: parentComment.id,
                }
              : null,
          );
          resetValue();
          setParentComment(null);
        }
      } else {
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
      }
    }
  };

  return (
    <>
      {comments.map(comment => {
        const { id, subCommentCount } = comment;
        const targetSubComment =
          newSubComment && Number(newSubComment.parentId) === Number(id)
            ? newSubComment
            : null;
        const isShowSubCommentList = subCommentCount > 0 || newSubComment;

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

            {isShowSubCommentList && (
              <SubCommentList
                commentId={id}
                count={subCommentCount}
                newSubComment={targetSubComment}
              />
            )}
          </List>
        );
      })}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '30px',
          color: COLOR.GREY.SUB,
        }}
      >
        {isLoading && !isEndData && (
          <CircularProgress size={20} color="inherit" />
        )}
      </Box>

      <InView
        onChange={async inView => {
          if (inView && !isEndData) {
            setIsLoading(true);
            onInfiniteScroll();
          }
        }}
      />

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
