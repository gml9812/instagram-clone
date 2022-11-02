import { useMutation, useQuery } from '@apollo/client';
import { setAccessToken } from '@libs/token';
import { CookiesName } from '@libs/values';
import { Box, CircularProgress, List } from '@mui/material';
import { REFRESH_ATOKEN_MUTATION } from '@queries/auth';
import { DEFAULT_POST_SIZE, GET_POSTS, Post } from '@queries/post';
import COLOR from '@styles/colors';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { InView } from 'react-intersection-observer';
import Feed from './Feed';

interface Props {
  initialPosts: Post[];
}

const FeedList = ({ initialPosts }: Props) => {
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
      postPaging: {
        size: DEFAULT_POST_SIZE,
        lastId,
      },
    },
  });

  const onInfiniteScroll = async () => {
    try {
      setIsLoading(true);
      await fetchMore({
        variables: {
          postPaging: {
            size: DEFAULT_POST_SIZE,
            lastId,
          },
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
        setLastId(data.getPosts[data.getPosts.length - 1]?.id);
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

export default FeedList;
