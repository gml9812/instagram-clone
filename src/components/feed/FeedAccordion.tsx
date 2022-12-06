import React from 'react';
import { Divider, Menu, MenuItem, MenuProps, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import EmailIcon from '@mui/icons-material/Email';
import COLOR from '@styles/colors';
import { useRouter } from 'next/router';

interface Props {
  postId: number;
  userId: number;
  isOpen: boolean;
  isMine: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  handleClickDeletePost: (postId: number) => Promise<void>;
  handleClickUpdatePost: () => void;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    minWidth: '150px',
    color: COLOR.CHARCOAL,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenuItem-root': {
      minHeight: 30,
      color: COLOR.CHARCOAL,
      fontSize: '1.1rem',
      '& .MuiSvgIcon-root': {
        width: 18,
        height: 18,
        color: COLOR.GREY.MAIN,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: COLOR.LIGHTGREY,
      },
    },
  },
}));

const FeedAccordion = ({
  postId,
  userId,
  isOpen,
  isMine,
  anchorEl,
  handleClose,
  handleClickDeletePost,
  handleClickUpdatePost,
}: Props) => {
  const router = useRouter();
  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {isMine ? (
        <ul>
          <MenuItem
            onClick={() => {
              handleClose();
              handleClickUpdatePost();
            }}
            disableRipple
          >
            <EditIcon />
            수정하기
          </MenuItem>

          <Divider sx={{ margin: 0 }} />

          <MenuItem
            onClick={() => {
              handleClose();
              handleClickDeletePost(postId);
            }}
            disableRipple
          >
            <DeleteIcon />
            삭제하기
          </MenuItem>
        </ul>
      ) : (
        <ul>
          <MenuItem
            onClick={() => {
              handleClose();
              router.push(`/user/${userId}`);
            }}
            disableRipple
          >
            <AccountBoxRoundedIcon />
            프로필 보기
          </MenuItem>

          <Divider sx={{ margin: 0 }} />

          <MenuItem
            onClick={() => {
              handleClose();
              router.push(`/comments/${postId}`);
            }}
            disableRipple
          >
            <CommentRoundedIcon />
            댓글 달기
          </MenuItem>

          <Divider sx={{ margin: 0 }} />

          <MenuItem
            onClick={() => {
              handleClose();
            }}
            disableRipple
          >
            <EmailIcon />
            메시지 보내기
          </MenuItem>
        </ul>
      )}
    </StyledMenu>
  );
};

export default FeedAccordion;
