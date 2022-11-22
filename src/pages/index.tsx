import React, { useEffect, useState } from 'react';
import { Box, IconButton } from '@mui/material';
import CustomHeader from '@components/layout/CustomHeader';
import CreatePostModal from '@components/post/CreatePostModal';
import Logo from '@icons/Logo';
import AddIcon from '@icons/AddIcon';
import AccountIcon from '@icons/AccountIcon';
import { GET_POSTS, Post, DEFAULT_POST_SIZE } from '@queries/post';
import FeedList from '@components/feed/FeedList';
import { useQuery } from '@apollo/client';
import { getRefreshToken } from '@libs/token';
import { GetServerSidePropsContext } from 'next';
// import { wsClient, wsConnect, wsDisconnect } from 'src/stomp/stompClient';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { CookiesName } from '@libs/values';
import { User } from '@queries/auth';

const Home = () => {
  const router = useRouter();

  const cookies = parseCookies();
  const user = cookies[CookiesName.user];
  const [loggedInUser, setLoggedInUser] = useState<User>({
    id: 0,
    nickname: '',
    profileImage: '',
  });

  useEffect(() => {
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, [user]);

  // const wsSubscribe = () => {
  //   wsClient.subscribe('/sub/notification', res => {
  //     console.log('res', res.body);
  //   });
  // };

  // useEffect(() => {
  //   wsConnect(wsSubscribe);
  //   return () => wsDisconnect();
  // }, []);

  const [initialPosts, setInitialPosts] = useState<Post[]>([]);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [fileList, setFileList] = useState<FileList>();
  const { data } = useQuery<{ getPosts: Post[] }>(GET_POSTS, {
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

  return (
    <>
      <CustomHeader
        headerIcon={
          <Box sx={{ margin: '8px 0 0 10px' }}>
            <Logo width={112} height={32} />
          </Box>
        }
        leftButton={
          <IconButton sx={{ margin: '0 6px 0 0' }} component="label">
            <AddIcon />
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={onFileUpload}
            />
          </IconButton>
        }
        rightButton={
          <IconButton
            onClick={() =>
              loggedInUser.id && router.push(`/user/${loggedInUser.id}`)
            }
          >
            <AccountIcon />
          </IconButton>
        }
      />

      {initialPosts.length > 0 && <FeedList initialPosts={initialPosts} />}
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
