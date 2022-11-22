import DetailPageHeader from '@components/layout/DetailPageHeader';
import { getRefreshToken } from '@libs/token';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

const Like = () => {
  const router = useRouter();
  const { type } = router.query || '';

  return (
    <>
      <DetailPageHeader pageName="좋아요" />

      <div>{type}</div>
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
