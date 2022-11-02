import { serverSideClient } from '@apollo/apolloClient';
import CommentInput from '@components/post/comment/CommentInput';
import DetailPageHeader from '@components/layout/DetailPageHeader';
import {
  getAccessToken,
  getRefreshToken,
  getUpdatedToken,
  setAccessToken,
} from '@libs/token';
import { Box } from '@mui/material';
import { DEFAULT_COMMENT_SIZE, GET_POST, PostWithComment } from '@queries/post';
import COLOR from '@styles/colors';
import { GetServerSidePropsContext } from 'next';
import React, { useRef } from 'react';
import CommentList from '@components/post/comment/CommentList';
import PostContent from '@components/post/PostContent';

interface Props {
  updatedToken: string;
  initialData: PostWithComment;
}

const PostPage = ({ updatedToken, initialData }: Props) => {
  if (updatedToken) {
    setAccessToken(updatedToken);
  }

  const { id, user, description, modifiedAt, comments } = initialData;

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickReply = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <DetailPageHeader pageName="댓글" />

      <Box
        sx={{ padding: '8px', borderBottom: `0.5px solid ${COLOR.GREY.SUB}` }}
      >
        <PostContent
          user={user}
          description={description}
          modifiedAt={modifiedAt}
        />
      </Box>

      <Box sx={{ padding: '0 8px' }}>
        <CommentList
          postId={id}
          initialComments={comments}
          handleClickReply={handleClickReply}
        />
      </Box>

      <CommentInput inputRef={inputRef} />
    </>
  );
};

export default PostPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const accessToken = getAccessToken(context);
  const refreshToken = getRefreshToken(context);
  if (!refreshToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  let updatedToken: string = '';
  if (!accessToken) {
    const token = await getUpdatedToken(refreshToken);
    updatedToken = token;
  }

  const { data } = await serverSideClient.query({
    query: GET_POST,
    variables: {
      id: context.query.id,
      commentPaging: { size: DEFAULT_COMMENT_SIZE },
    },
    context: {
      headers: {
        'A-TOKEN': accessToken || updatedToken,
      },
    },
  });

  return {
    props: {
      initialData: data.getPost,
      updatedToken,
    },
  };
};
