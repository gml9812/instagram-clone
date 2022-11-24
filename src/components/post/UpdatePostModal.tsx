import React, {
  forwardRef,
  Ref,
  ReactElement,
  useState,
  useEffect,
} from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogTitle,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Box,
  TextField,
  IconButton,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { TransitionProps } from '@mui/material/transitions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/css/pagination';
import { useMutation } from '@apollo/client';
import { Post, UPDATE_POST } from '@queries/post';
import COLOR from '@styles/colors';
import TextButton from '@components/template/TextButton';
import ProfileButton from '@components/template/ProfileButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement;
    },
    ref: Ref<unknown>,
  ) => {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);
Transition.displayName = 'Transition';

interface Props {
  open: boolean;
  onClose: () => void;
  post: Post | undefined;
}

const UpdatePostModal = ({ open, onClose, post }: Props) => {
  const [updatePost] = useMutation(UPDATE_POST);
  const [description, setDescription] = useState(post?.description);
  const [deletedMedias, setDeletedMedias] = useState<number[]>([]);
  const [openAlert, setOpenAlert] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleImageClick = (id: number) => {
    if (deletedMedias.includes(id)) {
      setDeletedMedias(deletedMedias.filter(mediaId => mediaId !== id));
      return;
    }
    setDeletedMedias([...deletedMedias, id]);
  };

  const handleClickUpdatepost = async () => {
    if (deletedMedias.length === post?.medias.length) {
      setOpenAlert(true);
      return;
    }
    await updatePost({
      variables: {
        updatePost: {
          id: post ? post.id : '',
          deletedMedias,
          description,
        },
      },
    });
    onClose();
    window.location.href = '/'; // subscription 도입 이전 글 갱신 위한 임시 코드
  };

  useEffect(() => {
    setDescription(post?.description);
  }, [post]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar
        position="static"
        color="transparent"
        elevation={1}
        sx={{ zIndex: '100' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              onClick={onClose}
            >
              <ArrowBackIosNewIcon fontSize="large" />
            </Box>
            <Typography
              variant="h5"
              noWrap
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                color: 'inherit',
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              게시물 수정
            </Typography>
            <Box sx={{ flexGrow: 0 }} onClick={handleClickUpdatepost}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  color: '#0095f6',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                완료
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {post && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '4px 10px 4px 6px',
          }}
        >
          <ProfileButton
            user={post.user}
            sx={{}}
            gap={3}
            size={32}
            borderBoxSize={26}
            disableButtonClick={false}
          />

          <TextButton
            sx={{
              display: 'flex',
              justifyContent: 'start',
              padding: '0 4px',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: COLOR.CHARCOAL,
            }}
          >
            {post.user.nickname}
          </TextButton>
        </Box>
      )}

      <Box
        sx={{
          overflow: 'hidden',
          padding: 0,
        }}
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={false}
          pagination
          modules={[Pagination]}
        >
          {post
            ? post.medias.map(image => {
                return (
                  <SwiperSlide key={`image-${image.url}`}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                        width: '100%',
                        height: 'auto',
                        background: COLOR.LIGHTGREY,
                        aspectRatio: '1 / 1',
                      }}
                    >
                      <Box
                        sx={{
                          opacity: deletedMedias.includes(Number(image.id))
                            ? '0.5'
                            : '1',
                        }}
                      >
                        <Image
                          src={image.url}
                          alt=""
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                      <Box
                        sx={{
                          color: 'white',
                          position: 'absolute',
                          top: 10,
                          left: 10,
                        }}
                      >
                        {deletedMedias.includes(Number(image.id)) ? (
                          <IconButton
                            size="small"
                            color="inherit"
                            onClick={() => handleImageClick(Number(image.id))}
                            sx={{
                              background: '#27292d',
                              '&:hover': {
                                backgroundColor: '#27292d',
                              },
                            }}
                          >
                            <FileUploadIcon fontSize="large" />
                          </IconButton>
                        ) : (
                          <IconButton
                            size="small"
                            color="inherit"
                            onClick={() => handleImageClick(Number(image.id))}
                            sx={{
                              background: '#27292d',
                              '&:hover': {
                                backgroundColor: '#27292d',
                              },
                            }}
                          >
                            <DeleteIcon fontSize="large" />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </SwiperSlide>
                );
              })
            : null}
        </Swiper>
      </Box>
      <TextField
        id="standard-multiline-flexible"
        multiline
        maxRows={4}
        value={description}
        onChange={handleChange}
        variant="standard"
        InputProps={{
          style: { fontSize: 15 },
        }}
        sx={{
          marginTop: 2,
          padding: 1,
        }}
      />
      <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
        <DialogTitle>하나 이상의 이미지를 포함해 주세요!</DialogTitle>
      </Dialog>
    </Dialog>
  );
};

export default UpdatePostModal;
