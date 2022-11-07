import sanitizeHTML from 'sanitize-html';
import { Box, SxProps, Theme } from '@mui/material';
import COLOR from '@styles/colors';
import React, { useState } from 'react';
import styled from 'styled-components';
import TextButton from '@components/template/TextButton';

interface Props {
  sx: SxProps<Theme> | undefined;
  nickname: string;
  description: string;
  showAllDescription: boolean;
}

const TextWrapper = styled(Box)`
  .user_nickname {
    height: '18px';
    line-height: '18px';
    font-weight: 700;
  }
`;

const HtmlText = ({ sx, nickname, description, showAllDescription }: Props) => {
  const [showMoreButton, setShowMoreButton] = useState<boolean>(
    !showAllDescription && description.length >= 15,
  );

  const handleClickMoreButton = () => {
    setShowMoreButton(false);
  };

  const textStyles = showMoreButton
    ? {
        fontSize: '1.1rem',
        color: COLOR.CHARCOAL,
        overflow: 'hidden',
        textOverflow: 'clip',
        whiteSpace: 'nowrap',
        lineHeight: '18px',
      }
    : {
        fontSize: '1.1rem',
        color: COLOR.CHARCOAL,
        lineHeight: '18px',
      };

  const html = `<span class="user_nickname">${nickname}</span> <span class="description">${description}</span>`;
  const sanitizedHTML = sanitizeHTML(html, {
    allowedTags: ['span', 'br'],
    allowedClasses: {
      span: ['user_nickname', 'description'],
    },
  });
  return (
    <Box sx={{ display: 'flex', ...sx }}>
      <TextWrapper
        sx={{
          ...textStyles,
        }}
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />

      {showMoreButton && (
        <TextButton
          sx={{
            padding: 0,
            minWidth: 'max-content',
            fontSize: '1.1rem',
            color: COLOR.GREY.MAIN,
            lineHeight: '18px',
            top: '-1px',
          }}
          onClick={handleClickMoreButton}
        >
          <Box
            sx={{
              margin: '0 2px 0 0',
              fontSize: '1.1rem',
              color: COLOR.CHARCOAL,
              lineHeight: '16px',
              height: '16px',
            }}
          >
            ...
          </Box>
          더 보기
        </TextButton>
      )}
    </Box>
  );
};

export default HtmlText;
