import React, { useEffect, useState } from 'react';
import LineWithTextButton from '@components/template/LineWithTextButton';
import { useQuery } from '@apollo/client';
import {
  DEFAULT_SUBCOMMENT_SIZE,
  GET_COMMENTS,
  SubComment,
} from '@queries/post';
import { Box, List } from '@mui/material';
import SubCommentItem from './SubCommentItem';

interface Props {
  commentId: number;
  count: number;
  handleClickReply: () => void;
}

const SubCommentList = ({ commentId, count, handleClickReply }: Props) => {
  const [isShowSubComments, setIsShowSubComment] = useState<boolean>(false);
  const { fetchMore, data } = useQuery<{ getSubComments: SubComment[] }>(
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
  const [subComments, setSubComments] = useState<SubComment[]>([]);
  const [lastId, setLastId] = useState<number>(0);
  const [isEndData, setIsEndData] = useState<boolean>(false);

  const handleClickShowSubComments = async () => {
    setIsShowSubComment(true);
  };

  useEffect(() => {
    const subCommentsData: SubComment[] = data?.getSubComments || [];
    setSubComments(subCommentsData);
    setLastId(subCommentsData[subCommentsData.length - 1]?.id || 0);
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
                  handleClickReply={handleClickReply}
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
