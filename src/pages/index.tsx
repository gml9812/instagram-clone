import React, { useEffect, useState } from 'react';
import { Box, IconButton, Popover, Button, ButtonGroup } from '@mui/material';
import CustomHeader from '@components/layout/CustomHeader';
import CreatePostModal from '@components/post/CreatePostModal';
import Logo from '@icons/Logo';
import AddIcon from '@icons/AddIcon';
import AccountIcon from '@icons/AccountIcon';
import { GET_POSTS, Post, DEFAULT_POST_SIZE } from '@queries/post';
import FeedList from '@components/feed/FeedList';
import { useQuery } from '@apollo/client';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { getRefreshToken } from '@libs/token';
import { GetServerSidePropsContext } from 'next';


const Home = () => {
  const [initialPosts, setInitialPosts] = useState<Post[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [fileList, setFileList] = useState<FileList>();
  const { data } = useQuery<{ getPosts: Post[] }>(GET_POSTS, {
    variables: {
      postPaging: {
        size: DEFAULT_POST_SIZE,
      },
    },
  });

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setFileList(event.target.files);
    }
    setOpenCreatePostModal(true);
    setAnchorEl(null);
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
          <>
            <IconButton
              sx={{ margin: '0 6px 0 0' }}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <AddIcon />
            </IconButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => {
                setAnchorEl(null);
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <ButtonGroup orientation="vertical" variant="text">
                <Button
                  component="label"
                  sx={{ fontSize: '14px', color: 'black' }}
                  endIcon={<ViewCompactOutlinedIcon />}
                >
                  게시물
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={onFileUpload}
                  />
                </Button>
                <Button
                  component="label"
                  sx={{ fontSize: '14px', color: 'black' }}
                  endIcon={<ControlPointOutlinedIcon />}
                >
                  스토리
                </Button>
              </ButtonGroup>
            </Popover>
          </>
        }
        rightButton={
          <IconButton>
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
