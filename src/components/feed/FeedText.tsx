import React, { ReactElement, useState } from 'react';
import { Box } from '@mui/material';
import COLOR from '@styles/colors';
import TextButton from '@components/template/TextButton';
import { ago } from '@libs/moment';

interface Props {
  nickname: string;
  description: string;
  commentCount: number;
  lastModifiedAt: string;
}

const renderMoreButton = (onClick: () => void) => {
  return (
    <TextButton
      sx={{
        padding: 0,
        margin: '0 0 2px 0',
        minWidth: '0',
        fontSize: 13,
        fontWeight: 400,
        color: COLOR.GREY.MAIN,
        lineHeight: '18px',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          margin: '0 2px 0 0',
          fontSize: 12,
          fontWeight: 400,
          color: COLOR.CHARCOAL,
          lineHeight: '16px',
          height: '16px',
        }}
      >
        ...
      </Box>
      더 보기
    </TextButton>
  );
};

const FeedText = ({
  nickname,
  description,
  commentCount,
  lastModifiedAt,
}: Props): ReactElement => {
  const beforeDescription = description.slice(0, 15);
  const afterDescription = description.slice(15);

  const [showMoreButton, setShowMoreButton] = useState<boolean>(
    description.length >= 15,
  );

  const handleClickMoreButton = () => {
    setShowMoreButton(false);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: `${
            afterDescription && !showMoreButton ? '0 16px' : '0 16px 2px'
          }`,
          whiteSpace: 'nowrap',
          height: '18px',
        }}
      >
        <TextButton
          sx={{
            padding: 0,
            fontSize: 13,
            fontWeight: 700,
            color: COLOR.CHARCOAL,
            lineHeight: '16px',
          }}
        >
          {nickname}
        </TextButton>
        <Box
          sx={{
            margin: '0 0 0 4px',
            fontSize: 13,
            fontWeight: 400,
            color: COLOR.CHARCOAL,
            lineHeight: '16px',
            overflow: 'hidden',
            textOverflow: 'clip',
            width: '40%',
            height: '16px',
          }}
        >
          {afterDescription ? beforeDescription : description}
        </Box>
        {showMoreButton && renderMoreButton(handleClickMoreButton)}
      </Box>

      {afterDescription && !showMoreButton && (
        <Box
          sx={{
            margin: '0 16px',
            fontSize: 13,
            fontWeight: 400,
            color: COLOR.CHARCOAL,
            lineHeight: '16px',
          }}
        >
          {afterDescription}
        </Box>
      )}

      {commentCount !== 0 && (
        <TextButton
          sx={{
            display: 'flex',
            justifyContent: 'start',
            padding: 0,
            margin: '0 16px',
            fontSize: 13,
            fontWeight: 400,
            color: COLOR.GREY.MAIN,
            lineHeight: '18px',
          }}
        >
          댓글 {commentCount}개 모두 보기
        </TextButton>
      )}

      <Box
        sx={{
          padding: '3px 16px',
          fontSize: 11,
          fontWeight: 400,
          color: COLOR.GREY.MAIN,
          lineHeight: '18px',
        }}
      >
        {ago(lastModifiedAt)}
      </Box>
    </>
  );
};

export default FeedText;
