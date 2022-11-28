import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { User, GET_USER } from '@queries/user';
import {
  Backdrop,
  CircularProgress,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { setAccessToken, setRefreshToken } from '@libs/token';
import { useSetRecoilState } from 'recoil';
import { userState } from 'src/recoil/userAtom';
import CustomHeader from '@components/layout/CustomHeader';
import { useQuery } from '@apollo/client';
import ProfileHeader from '@components/profile/ProfileHeader';
import ProfileQuote from '@components/profile/ProfileQuote';
import ProfileCounter from '@components/profile/ProfileCounter';
import ProfilePosts from '@components/profile/ProfilePosts';
import AddIcon from '@icons/AddIcon';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CreatePostModal from '@components/post/CreatePostModal';
import COLOR from '@styles/colors';

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const setUser = useSetRecoilState(userState);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [fileList, setFileList] = useState<FileList>();

  const { loading, error, data } = useQuery<{ getUser: User }>(GET_USER, {
    variables: {
      id,
      postPaging: {
        lastId: 1,
        size: 12,
      },
    },
  });

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setFileList(event.target.files);
    }
    setOpenCreatePostModal(true);
  };

  const handleClickLogout = () => {
    setAccessToken('');
    setRefreshToken('');
    setUser({ id: 0, nickname: '', profileImage: '', isLogin: false });
    window.location.href = '/';
  };

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
      <CustomHeader
        leftButton={
          <IconButton sx={{ color: 'black' }} onClick={() => router.back()}>
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
        }
        rightButton={
          data?.getUser.isMe ? (
            <>
              <IconButton component="label">
                <AddIcon />
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={onFileUpload}
                />
              </IconButton>

              <IconButton onClick={handleClickLogout}>
                <PersonOffOutlinedIcon
                  sx={{ color: COLOR.RED, fontSize: '26px' }}
                />
              </IconButton>
            </>
          ) : (
            <Box sx={{ width: '42px' }} />
          )
        }
      >
        <Typography
          variant="h5"
          noWrap
          sx={{
            color: 'black',
            fontWeight: 700,
          }}
        >
          {data?.getUser.nickname}
        </Typography>
      </CustomHeader>
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
      <ProfilePosts posts={data?.getUser.posts} />
      {fileList ? (
        <CreatePostModal
          open={openCreatePostModal}
          onClose={() => setOpenCreatePostModal(false)}
          fileList={fileList}
        />
      ) : null}
    </>
  );
};

export default ProfilePage;
