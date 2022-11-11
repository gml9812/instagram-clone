import { useMutation, useQuery } from '@apollo/client';
import { Box, CircularProgress, List } from '@mui/material';
import { DEFAULT_POST_SIZE, DELETE_POST, GET_POSTS, Post } from '@queries/post';
import COLOR from '@styles/colors';
import React, { useState } from 'react';
import { InView } from 'react-intersection-observer';
import Feed from './Feed';

interface Props {
  initialPosts: Post[];
}

const FeedList = ({ initialPosts }: Props) => {
  const initialLastId = Number(initialPosts[initialPosts.length - 1]?.id);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [lastId, setLastId] = useState<number | undefined>(
    initialLastId || undefined,
  );
  const [isEndData, setIsEndData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchMore } = useQuery<{ getPosts: Post[] }>(GET_POSTS, {
    variables: {
      postPaging: {
        size: DEFAULT_POST_SIZE,
        lastId,
      },
    },
  });
  const [deletePost] = useMutation(DELETE_POST);
  const handleClickDeletePost = async (postId: number) => {
    await deletePost({ variables: { id: postId } });
    const updatedPostList = posts.filter(post => Number(post.id) !== postId);
    setPosts(updatedPostList);
  };

  const onInfiniteScroll = async () => {
    const { data } = await fetchMore({
      variables: {
        postPaging: {
          size: DEFAULT_POST_SIZE,
          lastId,
        },
      },
    });
    const newPosts = data.getPosts;
    const updatedLastId = Number(newPosts[newPosts.length - 1]?.id);
    setPosts(prev => prev.concat(newPosts));
    setLastId(updatedLastId);
    if (!newPosts || newPosts.length < DEFAULT_POST_SIZE) {
      setIsEndData(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      {posts.map(post => {
        return (
          <List
            id={`post-${post.id}`}
            key={`post-${post.id}`}
            sx={{ padding: '4px  0' }}
          >
            <Feed {...post} handleClickDeletePost={handleClickDeletePost} />
          </List>
        );
      })}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '30px',
          color: COLOR.GREY.SUB,
        }}
      >
        {isLoading && !isEndData && (
          <CircularProgress size={20} color="inherit" />
        )}
      </Box>

      <InView
        onChange={async inView => {
          if (inView && !isEndData) {
            setIsLoading(true);
            onInfiniteScroll();
          }
        }}
      />
    </>
  );
};

export default FeedList;
