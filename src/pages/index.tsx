import React from 'react';
import type { GetServerSidePropsContext } from 'next';
import { Box, IconButton } from '@mui/material';
import CustomHeader from '@components/layout/CustomHeader';
import Logo from '@icons/Logo';
import AddIcon from '@icons/AddIcon';
import AccountIcon from '@icons/AccountIcon';
import { GET_POSTS, Post, DEFAULT_POST_SIZE } from '@queries/post';
import { serverSideClient } from '@apollo/apolloClient';
import {
  getAccessToken,
  getRefreshToken,
  getUpdatedToken,
  setAccessToken,
} from '@libs/token';
import FeedList from '@components/feed/FeedList';

interface Props {
  initialPosts: Post[];
  updatedToken: string;
}

const Home = ({ initialPosts, updatedToken }: Props) => {
  if (updatedToken) {
    setAccessToken(updatedToken);
  }

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

      <FeedList initialPosts={initialPosts} />
    </>
  );
};

export default Home;

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
      query: GET_POSTS,
      variables: { postPaging: { size: DEFAULT_POST_SIZE } },
      context: {
        headers: {
          'A-TOKEN': accessToken || updatedToken,
        },
      },
    });

    return {
      props: {
        initialPosts: data.getPosts || [],
        updatedToken,
      },
    };
  } catch {
    return {
      props: {
        initialPosts: [],
        updatedToken,
      },
    };
  }
};
