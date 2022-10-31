import React, { useEffect, useState } from 'react';
import type { GetServerSidePropsContext } from 'next';
import { Box, CircularProgress, IconButton, List } from '@mui/material';
import CustomHeader from '@components/layout/CustomHeader';
import Feed from '@components/feed/Feed';
import Logo from '@icons/Logo';
import AddIcon from '@icons/AddIcon';
import AccountIcon from '@icons/AccountIcon';
import { GET_POSTS, Post, DEFAULT_POST_SIZE } from '@queries/post';
import { serverSideClient } from '@apollo/apolloClient';
import { useMutation, useQuery } from '@apollo/client';
import { InView } from 'react-intersection-observer';
import {
  getAccessToken,
  getRefreshToken,
  getUpdatedToken,
  setAccessToken,
} from '@libs/token';
import { REFRESH_ATOKEN_MUTATION } from '@queries/auth';
import { parseCookies } from 'nookies';
import { CookiesName } from '@libs/values';
import COLOR from '@styles/colors';

interface Props {
  initialPosts: Post[];
  updatedToken: string;
}

const Home = ({ initialPosts, updatedToken }: Props) => {
  if (updatedToken) {
    setAccessToken(updatedToken);
  }

  const cookies = parseCookies();
  const refreshToken = cookies[CookiesName.refreshToken];
  const [refreshAToken] = useMutation<{ getATokenByRToken: string }>(
    REFRESH_ATOKEN_MUTATION,
    {
      context: {
        headers: {
          'R-TOKEN': refreshToken,
        },
      },
    },
  );

  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [lastId, setLastId] = useState<number>(
    initialPosts[initialPosts.length - 1]?.id || 0,
  );
  const [isInView, setIsInview] = useState<boolean>(false);
  const [isEndData, setIsEndData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchMore, data } = useQuery<{ getPosts: Post[] }>(GET_POSTS, {
    variables: {
      size: DEFAULT_POST_SIZE,
      lastId,
    },
  });

  const onInfiniteScroll = async () => {
    try {
      setIsLoading(true);
      await fetchMore({
        variables: {
          size: DEFAULT_POST_SIZE,
          lastId,
        },
      });
      setIsInview(true);
    } catch {
      const result = await refreshAToken();
      setAccessToken(result.data?.getATokenByRToken || '');
    }
  };

  useEffect(() => {
    if (isInView) {
      if (data) {
        setLastId(data.getPosts[data.getPosts.length - 1].id);
        setPosts(prev => prev.concat(data.getPosts));
      }
      if (!data || data.getPosts.length < DEFAULT_POST_SIZE) {
        setIsEndData(true);
      }
      setIsLoading(false);
      setIsInview(false);
    }
  }, [isInView, data]);

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

      {posts.map(post => {
        return (
          <List
            id={`post-${post.id}`}
            key={`post-${post.id}`}
            sx={{ padding: '4px  0' }}
          >
            <Feed {...post} />
          </List>
        );
      })}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '20px',
          color: COLOR.GREY.SUB,
        }}
      >
        {isLoading && !isEndData && (
          <CircularProgress size={20} color="inherit" />
        )}
      </Box>

      {data && (
        <InView
          onChange={async inView => {
            if (inView && !isEndData) {
              onInfiniteScroll();
            }
          }}
        />
      )}
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
  if (!accessToken) {
    const token = await getUpdatedToken(refreshToken);
    updatedToken = token;
  }

  const { data } = await serverSideClient.query({
    query: GET_POSTS,
    variables: { size: DEFAULT_POST_SIZE, lastId: 0 },
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
};
