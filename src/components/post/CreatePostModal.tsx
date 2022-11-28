import React, {
  useState,
  forwardRef,
  Ref,
  ReactElement,
  useEffect,
} from 'react';
import Image from 'next/image';
import {
  Dialog,
  Typography,
  AppBar,
  Toolbar,
  Container,
  Box,
  TextField,
  Backdrop,
  CircularProgress,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Slide from '@mui/material/Slide';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from 'src/queries/post';
import { TransitionProps } from '@mui/material/transitions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRecoilValue } from 'recoil';
import { UserAtomState, userState } from 'src/recoil/userAtom';
import COLOR from '@styles/colors';

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
  fileList: FileList;
}

const CreatePostModal = ({ open, onClose, fileList }: Props) => {
  const user: UserAtomState = useRecoilValue(userState);
  const [step, setStep] = useState<'choosePhoto' | 'writeDescription'>(
    'choosePhoto',
  );
  const [description, setDescription] = useState('');
  const [createPost, { loading, error }] = useMutation(CREATE_POST);
  const [phpsessid, setPhpsessid] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleClose = () => {
    onClose();
    setStep('choosePhoto');
    setDescription('');
  };

  const handleCreatePost = async () => {
    const data = new FormData();
    for (let i = 0; i < fileList.length; i += 1) {
      data.append('file', fileList[i]);
    }
    const imageUploadRes = await fetch(
      `https://resource-api.ggumim.co.kr/resource/v1/image/Undefined`,
      {
        method: 'POST',
        headers: {
          'x-phpsessid': phpsessid,
        },
        body: data,
      },
    );
    const imageUpload = await imageUploadRes.json();
    const medias = imageUpload.map((image: any) => {
      return {
        type: 'IMAGE',
        url: `https:${image.imageUrl}`,
        height: image.height,
        width: image.width,
      };
    });

    await createPost({
      variables: {
        post: {
          userIdx: user.id,
          description,
          medias,
        },
      },
    });
    if (error) {
      return;
    }
    handleClose();
  };

  const [imageSrcList, setImageSrcList] = useState<string[]>([]);

  const fileListToBase64 = async (files: FileList) => {
    const getBase64 = (file: File) => {
      const reader = new FileReader();
      return new Promise(resolve => {
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target === null) {
            return;
          }

          resolve(event.target.result);
        };
        reader.readAsDataURL(file);
      });
    };

    const promises = [];

    for (let i = 0; i < files.length; i += 1) {
      promises.push(getBase64(files[i]));
    }
    return Promise.all(promises);
  };

  useEffect(() => {
    const setImagePreview = async () => {
      if (fileList.length === 0) {
        return;
      }
      const arrayOfBase64 = await fileListToBase64(fileList);
      setImageSrcList(arrayOfBase64 as string[]);
    };
    setImagePreview();
  }, [fileList]);

  if (step === 'choosePhoto')
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
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
                onClick={handleClose}
              >
                <CloseIcon fontSize="large" />
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
                사진 미리보기
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
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
                  onClick={() => {
                    setStep('writeDescription');
                  }}
                >
                  다음
                </Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box
          sx={{
            overflow: 'hidden',
            padding: 0,
          }}
        >
          <Swiper
            slidesPerView="auto"
            spaceBetween={30}
            loop={false}
            pagination
            modules={[Pagination]}
          >
            {imageSrcList.map(imageSrc => {
              return (
                <SwiperSlide key={`image-${imageSrc}`}>
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
                    <Image
                      src={imageSrc}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
        <TextField
          required
          id="outlined-required"
          label="이미지 업로드 위해 PHPSESSID 입력"
          value={phpsessid}
          onChange={(event: any) => setPhpsessid(event.target.value)}
          sx={{ marginTop: 4 }}
        />
      </Dialog>
    );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
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
              onClick={() => setStep('choosePhoto')}
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
              새 게시물 만들기
            </Typography>
            <Box sx={{ flexGrow: 0 }} onClick={handleCreatePost}>
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
                공유하기
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ background: '#f1f2f6', height: '100%', padding: 0 }}>
        <Container
          sx={{
            background: 'white',
            borderBottom: '0.5px solid grey',
            marginBottom: '10px',
            padding: '10px 10px 10px 10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: 0,
            }}
          >
            <Avatar
              alt=""
              src={user.profileImage}
              sx={{ width: 32, height: 32, marginRight: 2, marginTop: 1 }}
            />
            <TextField
              multiline
              minRows={3}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: 15 },
              }}
              value={description}
              onChange={handleChange}
              variant="standard"
              fullWidth
            />
            <Box sx={{ display: 'flex', alignItems: 'center', paddingLeft: 2 }}>
              <Image
                src={imageSrcList[0]}
                alt="uploaded image"
                width="80"
                height="80"
                objectFit="cover"
              />
            </Box>
          </Box>
        </Container>

        <Accordion sx={{ marginBottom: '10px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontSize: '16px' }}>위치 추가</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontSize: '16px' }}>사람 태그하기</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

export default CreatePostModal;
