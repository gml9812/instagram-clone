import React from 'react';
import Image from 'next/image';
import COLOR from '@styles/colors';
import { Box, IconButton, SxProps, Theme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';

interface Props {
  sx: SxProps<Theme> | undefined;
  profileImage: string | undefined;
  size: number;
  borderBoxSize: number;
  gap: number;
}

const ProfileImageContainer = styled(Box)`
  .rounded {
    border-radius: 100px;
  }
`;

const BorderProfileButton = ({
  sx,
  profileImage,
  size,
  borderBoxSize,
  gap,
}: Props) => {
  return (
    <IconButton sx={{ padding: '4px', ...sx }}>
      <ProfileImageContainer
        sx={{
          position: 'relative',
          margin: '4px',
          width: `${borderBoxSize}px`,
          height: `${borderBoxSize}px`,
          border: `1px solid ${COLOR.LIGHTGREY}`,
          borderRadius: '100px',
        }}
      >
        {!profileImage ? (
          <AccountCircleIcon
            sx={{
              position: 'absolute',
              top: `-${gap}px`,
              left: `-${gap}px`,
              width: `${size}px`,
              height: `${size}px`,
              color: COLOR.GREY.SUB,
            }}
          />
        ) : (
          <Image
            className="rounded"
            src={`${profileImage}`}
            alt=""
            layout="fill"
          />
        )}
      </ProfileImageContainer>
    </IconButton>
  );
};

export default BorderProfileButton;
