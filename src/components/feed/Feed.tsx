import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import { Post } from 'src/queries/post';
import FeedHeader from './FeedHeader';
import FeedImage from './FeedImage';
import FeedContent from './FeedContent';
import FeedIconActions from './FeedIconActions';

interface Props extends Post {
  handleClickDeletePost: (postId: number) => Promise<void>;
}

const Feed = ({
  id,
  user,
  description,
  medias,
  likeCount,
  commentCount,
  isLike,
  isMine,
  createdAt,
  handleClickDeletePost,
}: Props): ReactElement => {
  return (
    <>
      <FeedHeader
        postId={id}
        user={user}
        isMine={isMine}
        handleClickDeletePost={handleClickDeletePost}
      />
      <FeedImage imageList={medias} />
      <Box>
        <FeedIconActions id={id} isLike={isLike} likeCount={likeCount} />
        <FeedContent
          id={id}
          nickname={user.nickname}
          description={description}
          commentCount={commentCount}
          createdAt={createdAt}
        />
      </Box>
    </>
  );
};

export default Feed;
