import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import COLOR from '@styles/colors';
import TextButton from '@components/template/TextButton';
import { ago } from '@libs/moment';
import { useRouter } from 'next/router';
import HtmlText from '@components/feed/HtmlText';

interface Props {
  id: number;
  nickname: string;
  description: string;
  commentCount: number;
  createdAt: string;
}

const FeedText = ({
  id,
  nickname,
  description,
  commentCount,
  createdAt,
}: Props): ReactElement => {
  const router = useRouter();
  const handleClickComment = () => {
    router.push(`/post/${id}`);
  };

  return (
    <>
      <HtmlText
        sx={{ padding: '0 16px' }}
        nickname={nickname}
        description={description}
        showAllDescription={false}
      />

      {commentCount !== 0 && (
        <TextButton
          sx={{
            display: 'flex',
            justifyContent: 'start',
            padding: 0,
            margin: '0 16px',
            fontSize: '1.1rem',
            color: COLOR.GREY.MAIN,
            lineHeight: '18px',
          }}
          onClick={handleClickComment}
        >
          댓글 {commentCount}개 모두 보기
        </TextButton>
      )}

      <Box
        sx={{
          padding: '3px 16px',
          fontSize: '1rem',
          color: COLOR.GREY.MAIN,
          lineHeight: '18px',
        }}
      >
        {ago(createdAt)}
      </Box>
    </>
  );
};

export default FeedText;
