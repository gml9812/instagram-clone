import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import { Post } from 'src/queries/post';
import FeedHeader from './FeedHeader';
import FeedImage from './FeedImage';
import FeedContent from './FeedContent';
import FeedIconActions from './FeedIconActions';

const Feed = ({
  id,
  user,
  description,
  medias,
  likeCount,
  commentCount,
  isLike,
  isMine,
  modifiedAt,
}: Post): ReactElement => {
  return (
    <>
      <FeedHeader user={user} isMine={isMine} />
      <FeedImage imageList={medias} />
      <Box>
        <FeedIconActions id={id} isLike={isLike} likeCount={likeCount} />
        <FeedContent
          id={id}
          nickname={user.nickname}
          description={description}
          commentCount={commentCount}
          modifiedAt={modifiedAt}
        />
      </Box>
    </>
  );
};

export default Feed;
