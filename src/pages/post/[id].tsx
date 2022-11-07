import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { serverSideClient } from '@apollo/apolloClient';
import { DEFAULT_COMMENT_SIZE, GET_POST, PostWithComment } from '@queries/post';
import {
  getAccessToken,
  getRefreshToken,
  getUpdatedToken,
  setAccessToken,
} from '@libs/token';
import COLOR from '@styles/colors';
import { Box } from '@mui/material';
import DetailPageHeader from '@components/layout/DetailPageHeader';
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

      <CommentList postId={id} initialComments={comments} />
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
  try {
    if (!accessToken) {
      const token = await getUpdatedToken(refreshToken);
      updatedToken = token;
    }
  } catch {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
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
        initialData: data.getPost || [],
        updatedToken,
      },
    };
  } catch {
    return {
      props: {
        initialData: [],
        updatedToken,
      },
    };
  }
};
