import React, { useState } from 'react';
import DetailPageHeader from '@components/layout/DetailPageHeader';
import { GET_POST_DETAIL, Post, DELETE_POST } from '@queries/post';
import { DEFAULT_COMMENT_SIZE } from '@queries/comment';
import { useRouter } from 'next/router';
import Feed from '@components/feed/Feed';
import { useMutation, useQuery } from '@apollo/client';
import UpdatePostModal from '@components/post/UpdatePostModal';
import { Box, CircularProgress } from '@mui/material';
import COLOR from '@styles/colors';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [updatePost, setUpdatePost] = useState<Post>();
  const [openUpdatePostModal, setOpenUpdatePostModal] = useState(false);
  const [deletePost] = useMutation(DELETE_POST);
  const { data, loading, error } = useQuery<{ getPost: Post }>(
    GET_POST_DETAIL,
    {
      variables: {
        id,
        commentPaging: {
          size: DEFAULT_COMMENT_SIZE,
          lastId: 1,
        },
      },
      fetchPolicy: 'no-cache',
    },
  );

  const handleClickDeletePost = async (postId: number) => {
    await deletePost({ variables: { id: postId } });
    router.push('/');
  };

  const chooseUpdatePost = (post: Post) => {
    setOpenUpdatePostModal(true);
    setUpdatePost(post);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '30px',
          color: COLOR.GREY.SUB,
        }}
      >
        <CircularProgress size={20} color="inherit" />
      </Box>
    );
  }
  if (error) {
    return 'error';
  }
  return (
    <>
      <DetailPageHeader pageName="게시글" />
      <Feed
        {...(data?.getPost as Post)}
        handleClickDeletePost={handleClickDeletePost}
        handleClickUpdatePost={() => chooseUpdatePost(data?.getPost as Post)}
      />
      <UpdatePostModal
        open={openUpdatePostModal}
        onClose={() => setOpenUpdatePostModal(false)}
        post={updatePost}
      />
    </>
  );
};

export default PostPage;
