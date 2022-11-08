import React, { useEffect, useState } from 'react';
import LineWithTextButton from '@components/template/LineWithTextButton';
import { useQuery } from '@apollo/client';
import { DEFAULT_SUBCOMMENT_SIZE, GET_COMMENTS, Comment } from '@queries/post';
import { Box, List } from '@mui/material';
import SubCommentItem from './SubCommentItem';

interface Props {
  commentId: number;
  count: number;
  handleClickReply: (comment: Comment) => void;
}

const SubCommentList = ({ commentId, count, handleClickReply }: Props) => {
  const [isShowSubComments, setIsShowSubComment] = useState<boolean>(false);
  const { fetchMore, data } = useQuery<{ getSubComments: Comment[] }>(
    GET_COMMENTS,
    {
      variables: {
        id: commentId,
        commentPaging: {
          size: DEFAULT_SUBCOMMENT_SIZE,
        },
      },
    },
  );
  const [subComments, setSubComments] = useState<Comment[]>([]);
  const [lastId, setLastId] = useState<number | undefined>(undefined);
  const [isEndData, setIsEndData] = useState<boolean>(false);

  const handleClickShowSubComments = async () => {
    setIsShowSubComment(true);
  };

  useEffect(() => {
    const subCommentsData: Comment[] = data?.getSubComments || [];
    setSubComments(subCommentsData);
    const updatedLastId = Number(
      subCommentsData[subCommentsData.length - 1]?.id,
    );
    setLastId(updatedLastId || undefined);
  }, [data]);

  const handleClickMoreButton = async () => {
    const result = await fetchMore({
      variables: {
        id: commentId,
        commentPaging: {
          size: DEFAULT_SUBCOMMENT_SIZE,
          lastId,
        },
      },
    });

    if (result && result.data.getSubComments.length > 0) {
      const subCommentsData = result.data.getSubComments;
      setSubComments(prev => prev.concat(subCommentsData));
      setLastId(subCommentsData[subCommentsData.length - 1].id);
    }
  };

  const handleClickHideButton = () => {
    setIsShowSubComment(false);
  };

  useEffect(() => {
    if (subComments.length >= count) {
      setIsEndData(true);
    }
  }, [count, subComments]);

  return (
    <Box>
      {!isShowSubComments ? (
        <LineWithTextButton
          sx={{ padding: '10px 0 0 46px' }}
          buttonText={`답글 ${count}개 더 보기`}
          handleClick={handleClickShowSubComments}
        />
      ) : (
        <Box sx={{ padding: '8px 0 8px 36px' }}>
          {subComments.map(subComment => {
            const { id } = subComment;
            return (
              <List id={`subComment-${id}`} key={`subComment-${id}`}>
                <SubCommentItem
                  {...subComment}
                  handleClickReply={() => handleClickReply(subComment)}
                />
              </List>
            );
          })}

          <LineWithTextButton
            sx={{ padding: '10px 0 0 14px' }}
            buttonText={isEndData ? '답글 숨기기' : '답글 더 보기'}
            handleClick={
              isEndData ? handleClickHideButton : handleClickMoreButton
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default SubCommentList;
