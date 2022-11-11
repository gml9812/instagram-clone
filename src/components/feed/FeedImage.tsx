import React, { ReactElement, useState } from 'react';
import Image from 'next/image';
import { Media } from 'src/queries/post';
import { Box, Pagination, styled } from '@mui/material';
import COLOR from '@styles/colors';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

interface Props {
  imageList: Media[];
}

const CssPagination = styled(Pagination)({
  '& .MuiButtonBase-root': {
    background: COLOR.GREY.SUB,
    fontSize: 0,
    minWidth: '6px',
    width: '6px',
    height: '6px',
    padding: 0,
    margin: '2.2px',
    '&.Mui-selected': {
      background: COLOR.BLUE.MAIN,
    },
  },
});

const FeedImage = ({ imageList }: Props): ReactElement => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <>
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
          pagination={{ clickable: true }}
          onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
        >
          {imageList.map(image => {
            return (
              <SwiperSlide key={`image-${image.id}`}>
                <Box
                  sx={{
                    position: 'relative',
                    width: `100%`,
                    height: 'auto',
                    background: COLOR.LIGHTGREY,
                    aspectRatio: `${image.width} / ${image.height}`,
                  }}
                >
                  <Image
                    src={`${image.url}`}
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

      {imageList.length > 1 && (
        <CssPagination
          sx={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '42px',
          }}
          count={imageList.length}
          page={activeIndex + 1}
          hidePrevButton
          hideNextButton
        />
      )}
    </>
  );
};

export default FeedImage;
