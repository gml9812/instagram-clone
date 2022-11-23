import React from 'react';
import Image from 'next/image';
import COLOR from '@styles/colors';
import { Box, IconButton, SxProps, Theme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { User } from '@queries/auth';

interface Props {
  user: User;
  sx: SxProps<Theme> | undefined;
  gap: number;
  size: number;
  borderBoxSize: number;
  disableButtonClick: boolean;
}

const ProfileImageContainer = styled(Box)`
  .rounded {
    border-radius: 100px;
  }
`;

const ProfileButton = ({
  user,
  sx,
  gap,
  size,
  borderBoxSize,
  disableButtonClick,
}: Props) => {
  const router = useRouter();
  return (
    <IconButton
      sx={{ padding: '4px', ...sx }}
      onClick={() => {
        if (disableButtonClick) {
          return;
        }
        router.push(`/user/${user.id}`);
      }}
    >
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
        {user.profileImage ? (
          <Image
            className="rounded"
            src={`${user.profileImage}`}
            alt=""
            layout="fill"
          />
        ) : (
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
        )}
      </ProfileImageContainer>
    </IconButton>
  );
};

export default ProfileButton;
