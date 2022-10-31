import React, { ReactElement } from 'react';
import { Box } from '@mui/material';
import { Post } from 'src/queries/post';
import FeedHeader from './FeedHeader';
import FeedImage from './FeedImage';
import FeedText from './FeedText';
import FeedIconActions from './FeedIconActions';

const Feed = ({
  user,
  description,
  medias,
  likeCount,
  commentCount,
  isLike,
  isMine,
  lastModifiedAt,
}: Post): ReactElement => {
  return (
    <>
      <FeedHeader user={user} isMine={isMine} />
      <FeedImage imageList={medias} />
      <Box>
        <FeedIconActions isLike={isLike} likeCount={likeCount} />
        <FeedText
          nickname={user.nickname}
          description={description}
          commentCount={commentCount}
          lastModifiedAt={lastModifiedAt}
        />
      </Box>
    </>
  );
};

export default Feed;
