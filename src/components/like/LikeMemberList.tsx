import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, CircularProgress, List } from '@mui/material';
import { DEFAULT_LIKE_MEMBER_SIZE, GET_LIKES, LikeItem } from '@queries/like';
import COLOR from '@styles/colors';
import { InView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
import LikeMemberItem from './LikeMemberItem';

interface Props {
  id: number;
  type: string;
  initialLikeMembers: LikeItem[];
}

const LikeMemberList = ({ id, type, initialLikeMembers }: Props) => {
  const router = useRouter();
  const initialLastId = initialLikeMembers[initialLikeMembers.length - 1]?.id;
  const [likeMembers, setLikeMembers] =
    useState<LikeItem[]>(initialLikeMembers);
  const [lastId, setLastId] = useState<number | undefined>(
    initialLastId || undefined,
  );
  const [isEndData, setIsEndData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { fetchMore } = useQuery<{ getLikes: LikeItem[] }>(GET_LIKES, {
    variables: {
      likeInput: {
        itemId: id,
        type: String(type).toUpperCase(),
      },
      pagingInput: {
        size: DEFAULT_LIKE_MEMBER_SIZE,
        lastId,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const onInfiniteScroll = async () => {
    const { data } = await fetchMore({
      variables: {
        postPaging: {
          size: DEFAULT_LIKE_MEMBER_SIZE,
          lastId,
        },
      },
    });
    const newLikeMembers = data.getLikes;
    const updatedLastId = newLikeMembers[newLikeMembers.length - 1]?.id;
    setLikeMembers(prev => prev.concat(newLikeMembers));
    setLastId(updatedLastId);
    if (!newLikeMembers || newLikeMembers.length < DEFAULT_LIKE_MEMBER_SIZE) {
      setIsEndData(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      {likeMembers.map(item => {
        return (
          <List
            id={`like-${item.id}`}
            key={`like-${item.id}`}
            sx={{ padding: '4px 0' }}
            onClick={() => router.push(`/user/${item.user.id}`)}
          >
            <LikeMemberItem item={item} />
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

export default LikeMemberList;
