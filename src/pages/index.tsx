import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CustomHeader from '@components/layout/CustomHeader';
import Logo from '@icons/Logo';
import AddIcon from '@icons/AddIcon';
import AccountIcon from '@icons/AccountIcon';
import { GET_POSTS, Post, DEFAULT_POST_SIZE } from '@queries/post';
import FeedList from '@components/feed/FeedList';
import { useQuery } from '@apollo/client';
import { getRefreshToken } from '@libs/token';
import { GetServerSidePropsContext } from 'next';

const Home = () => {
  const [initialPosts, setInitialPosts] = useState<Post[]>([]);
  const { data } = useQuery<{ getPosts: Post[] }>(GET_POSTS, {
    variables: {
      postPaging: {
        size: DEFAULT_POST_SIZE,
      },
    },
  });

  useEffect(() => {
    if (data && data.getPosts) {
      setInitialPosts(data.getPosts);
    }
  }, [data]);

  return (
    <>
      <CustomHeader
        headerIcon={
          <Box sx={{ margin: '8px 0 0 10px' }}>
            <Logo width={112} height={32} />
          </Box>
        }
        leftButton={
          <IconButton sx={{ margin: '0 6px 0 0' }}>
            <AddIcon />
          </IconButton>
        }
        rightButton={
          <IconButton>
            <AccountIcon />
          </IconButton>
        }
      />

      {initialPosts.length > 0 && <FeedList initialPosts={initialPosts} />}
    </>
  );
};

export default Home;

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
