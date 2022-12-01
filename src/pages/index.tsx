import React, { useEffect, useState } from 'react';
import { Box, IconButton, CircularProgress } from '@mui/material';
import CustomHeader from '@components/layout/CustomHeader';
import CreatePostModal from '@components/post/CreatePostModal';
import Logo from '@icons/Logo';
import AddIcon from '@icons/AddIcon';
import AccountIcon from '@icons/AccountIcon';
import {
  DefaultNotificationIcon,
  AlertNotificationIcon,
} from '@icons/NotificationIcon';
import COLOR from '@styles/colors';
import { GET_POSTS, Post, DEFAULT_POST_SIZE } from '@queries/post';
import FeedList from '@components/feed/FeedList';
import { useQuery } from '@apollo/client';
import { getRefreshToken } from '@libs/token';
import { GetServerSidePropsContext } from 'next';
import { wsClient, wsConnect, wsDisconnect } from 'src/stomp/stompClient';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { UserAtomState, userState } from 'src/recoil/userAtom';
import FloatingButton from '@components/template/FloatingButton';

const Home = () => {
  const router = useRouter();
  const user: UserAtomState = useRecoilValue(userState);

  const [isShowFloatingButton, setIsShowFloatingButton] =
    useState<boolean>(false);

  const wsSubscribe = () => {
    wsClient.subscribe('/sub/noti/post', res => {
      setIsShowFloatingButton(res.body.toLocaleLowerCase() === 'true');
    });
  };

  useEffect(() => {
    wsConnect(wsSubscribe);
    return () => wsDisconnect();
  }, []);

  // 새로운 알림이 있다면 true
  const isAlert = false;

  const [initialPosts, setInitialPosts] = useState<Post[]>([]);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [fileList, setFileList] = useState<FileList>();
  const { data, loading, error } = useQuery<{ getPosts: Post[] }>(GET_POSTS, {
    variables: {
      postPaging: {
        size: DEFAULT_POST_SIZE,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setFileList(event.target.files);
    }
    setOpenCreatePostModal(true);
  };

  useEffect(() => {
    if (data && data.getPosts) {
      setInitialPosts(data.getPosts);
    }
  }, [data]);

  const handleClickLogo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClickNewPost = () => {
    router.reload();
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '30px',
          color: COLOR.GREY.SUB,
        }}
      >
        <CircularProgress size={20} color="inherit" />
      </Box>
    );
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <>
      <CustomHeader
        leftButton={
          <Box sx={{ margin: '8px 0 0 10px' }} onClick={handleClickLogo}>
            <Logo width={112} height={32} />
          </Box>
        }
        rightButton={
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

            <IconButton
              onClick={() => {
                if (user.isLogin) {
                  router.push(`/notification/${user.id}`);
                }
              }}
            >
              {isAlert ? (
                <AlertNotificationIcon />
              ) : (
                <DefaultNotificationIcon />
              )}
            </IconButton>

            <IconButton
              onClick={() => {
                if (user.isLogin) {
                  router.push(`/user/${user.id}`);
                }
              }}
            >
              <AccountIcon />
            </IconButton>
          </>
        }
      />

      {initialPosts.length > 0 && <FeedList initialPosts={initialPosts} />}

      <FloatingButton
        sx={{ display: 'flex', justifyContent: 'center' }}
        title="새 게시물"
        isShow={isShowFloatingButton}
        handleClick={handleClickNewPost}
      />

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

export default Home;

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
