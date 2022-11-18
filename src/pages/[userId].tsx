import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { User, GET_USER } from '@queries/user';
import { Backdrop, CircularProgress } from '@mui/material';
import DetailPageHeader from '@components/layout/DetailPageHeader';
import { useQuery } from '@apollo/client';
import ProfileHeader from '@components/profile/ProfileHeader';
import ProfileQuote from '@components/profile/ProfileQuote';
import ProfileCounter from '@components/profile/ProfileCounter';
import ProfilePosts from '@components/profile/ProfilePosts';

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { loading, error, data } = useQuery<{ getUser: User }>(GET_USER, {
    variables: {
      id: userId,
      postPaging: {
        lastId: 1,
        size: 12,
      },
    },
  });

  if (loading)
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  if (error) return <>error</>;
  return (
    <>
      <DetailPageHeader
        pageName={data?.getUser.nickname ? data?.getUser.nickname : ''}
      />
      <ProfileHeader
        profileImage={data?.getUser.profileImage}
        name={data?.getUser.nickname}
      />
      <ProfileQuote quote={data?.getUser.quotes} name={data?.getUser.name} />
      <ProfileCounter
        postCount={data?.getUser.postCount}
        followCount={0}
        followerCount={0}
      />
      <ProfilePosts
        posts={
          /* data?.getUser.posts */ [
            {
              commentCount: 0,
              createdAt: '2022-11-17T05:40:23',
              description: 'df',
              id: 25,
              isLike: false,
              isMine: true,
              likeCount: 0,
              medias: [
                {
                  height: 1160,
                  id: 22,
                  url: 'https://image.ggumim.co.kr/image/r/600/storage/c5d41a42-f75a-4922-a2ff-42ac11f4b0c2.jpg',
                  width: 1170,
                },
              ],
              user: {
                id: 10,
                nickname: 'homer',
                profileImage: '',
              },
            },
            {
              commentCount: 0,
              createdAt: '2022-11-17T05:40:23',
              description: 'df',
              id: 25,
              isLike: false,
              isMine: true,
              likeCount: 0,
              medias: [
                {
                  height: 1160,
                  id: 22,
                  url: 'https://image.ggumim.co.kr/image/r/600/storage/c5d41a42-f75a-4922-a2ff-42ac11f4b0c2.jpg',
                  width: 1170,
                },
              ],
              user: {
                id: 10,
                nickname: 'homer',
                profileImage: '',
              },
            },
            {
              commentCount: 0,
              createdAt: '2022-11-17T05:40:23',
              description: 'df',
              id: 25,
              isLike: false,
              isMine: true,
              likeCount: 0,
              medias: [
                {
                  height: 1160,
                  id: 22,
                  url: 'https://image.ggumim.co.kr/image/r/600/storage/c5d41a42-f75a-4922-a2ff-42ac11f4b0c2.jpg',
                  width: 1170,
                },
              ],
              user: {
                id: 10,
                nickname: 'homer',
                profileImage: '',
              },
            },
          ]
        }
      />
    </>
  );
};

export default ProfilePage;
