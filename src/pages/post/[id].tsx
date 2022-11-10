import React, { useCallback, useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { DEFAULT_COMMENT_SIZE, GET_POST, PostWithComment } from '@queries/post';
import { getRefreshToken } from '@libs/token';
import COLOR from '@styles/colors';
import { Box } from '@mui/material';
import DetailPageHeader from '@components/layout/DetailPageHeader';
import CommentList from '@components/post/comment/CommentList';
import PostContent from '@components/post/PostContent';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const PostPage = () => {
  const router = useRouter();
  const postId = Number(router.query.id) || undefined;
  const [initialPost, setInitialPost] = useState<PostWithComment | null>(null);

  const { fetchMore } = useQuery<{ getPost: PostWithComment }>(GET_POST, {
    variables: {
      id: postId,
      commentPaging: { size: DEFAULT_COMMENT_SIZE },
    },
  });

  const getPost = useCallback(async () => {
    const { data } = await fetchMore({
      variables: {
        id: postId,
        commentPaging: { size: DEFAULT_COMMENT_SIZE },
      },
    });
    setInitialPost(data.getPost);
  }, [fetchMore, postId]);

  useEffect(() => {
    if (postId) {
      getPost();
    }
  }, [getPost, postId]);

  return (
    <>
      <DetailPageHeader pageName="댓글" />

      {initialPost && postId && (
        <>
          <Box
            sx={{
              padding: '8px',
              borderBottom: `0.5px solid ${COLOR.GREY.SUB}`,
            }}
          >
            <PostContent
              user={initialPost.user}
              description={initialPost.description}
              modifiedAt={initialPost.modifiedAt}
            />
          </Box>

          <CommentList
            postId={postId}
            commetCount={initialPost.commentCount}
            initialComments={initialPost.comments}
          />
        </>
      )}
    </>
  );
};

export default PostPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const refreshToken = getRefreshToken(context);

  if (!refreshToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
