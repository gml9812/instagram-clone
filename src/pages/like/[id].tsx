import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRefreshToken } from '@libs/token';
import { GetServerSidePropsContext } from 'next';
import DetailPageHeader from '@components/layout/DetailPageHeader';
import LikeMemberList from '@components/like/LikeMemberList';
import { DEFAULT_LIKE_MEMBER_SIZE, GET_LIKES, LikeItem } from '@queries/post';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';

const Like = () => {
  const router = useRouter();

  const { id, type } = router.query || '';
  const itemId = Number(id) || undefined;
  const itemType = String(type) || '';

  const [initialLikeMembers, setInitialLikeMembers] = useState<
    LikeItem[] | null
  >(null);
  const { data } = useQuery<{ getLikes: LikeItem[] }>(GET_LIKES, {
    variables: {
      likeInput: {
        itemId: id,
        type: String(type).toUpperCase(),
      },
      pagingInput: {
        size: DEFAULT_LIKE_MEMBER_SIZE,
      },
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (data && data.getLikes) {
      setInitialLikeMembers(data.getLikes);
    }
  }, [data]);

  return (
    <>
      <DetailPageHeader pageName="좋아요" />

      {itemId && initialLikeMembers && (
        <Box sx={{ padding: '10px 12px' }}>
          <LikeMemberList
            id={itemId}
            type={itemType}
            initialLikeMembers={initialLikeMembers}
          />
        </Box>
      )}
    </>
  );
};

export default Like;

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
