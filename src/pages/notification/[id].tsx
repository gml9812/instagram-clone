import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_NOTIFICATIONS } from '@queries/notification';
import { Box, CircularProgress, IconButton, Avatar, List } from '@mui/material';
import { ago } from '@libs/moment';
import HtmlText from '@components/feed/HtmlText';
import { useRouter } from 'next/router';
import DetailPageHeader from '@components/layout/DetailPageHeader';
import COLOR from '@styles/colors';

const Notification = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_NOTIFICATIONS, {
    fetchPolicy: 'no-cache',
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '30px',
          color: COLOR.GREY.SUB,
        }}
      >
        <CircularProgress size={20} color="inherit" />
      </Box>
    );
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <>
      <DetailPageHeader pageName="알림" />
      {data.getNotifications
        .slice(0)
        .reverse()
        .map((notification: any) => {
          const { id } = notification;
          const notificationContent = JSON.parse(notification.content);

          return (
            <List
              id={`alert-${id}`}
              key={`comment-${id}`}
              sx={{ padding: '8px 16px' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}
                >
                  <IconButton
                    sx={{ marginRight: '14px', padding: '0px' }}
                    onClick={() =>
                      router.push(
                        `/user/${notificationContent.notificationDto.creatorId}`,
                      )
                    }
                  >
                    <Avatar
                      alt={notificationContent.notificationDto.nickname}
                      src={notificationContent.notificationDto.profileImage}
                      sx={{ width: 44, height: 44 }}
                    />
                  </IconButton>

                  <Box
                    sx={{ padding: '4px 0 0' }}
                    onClick={() =>
                      router.push({
                        pathname: notificationContent.commentId
                          ? `/comments/${notificationContent.notificationDto.postId}`
                          : `/post/${notificationContent.notificationDto.postId}`,
                        ...(notificationContent.commentId && {
                          query: {
                            target: notificationContent.commentId,
                          },
                        }),
                      })
                    }
                  >
                    <HtmlText
                      sx={{}}
                      nickname={notificationContent.notificationDto.nickname}
                      description={
                        notificationContent.likeType
                          ? `님이 회원님의 ${
                              notificationContent.likeType === 'POST'
                                ? '글'
                                : '댓글'
                            }을 좋아합니다.`
                          : `님이 댓글을 남겼습니다.`
                      }
                      showAllDescription
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        fontSize: '1rem',
                        color: COLOR.GREY.MAIN,
                        lineHeight: '18px',
                      }}
                    >
                      {ago(notificationContent.notificationDto.createdAt)}
                    </Box>
                  </Box>
                </Box>

                <IconButton
                  sx={{ marginLeft: '14px', padding: '0px' }}
                  onClick={() =>
                    router.push({
                      pathname: notificationContent.commentId
                        ? `/comments/${notificationContent.notificationDto.postId}`
                        : `/post/${notificationContent.notificationDto.postId}`,
                      ...(notificationContent.commentId && {
                        query: {
                          target: notificationContent.commentId,
                        },
                      }),
                    })
                  }
                >
                  <Avatar
                    alt={notificationContent.notificationDto.nickname}
                    src={notificationContent.notificationDto.imageUrl}
                    sx={{ width: 44, height: 44 }}
                    variant="square"
                  />
                </IconButton>
              </Box>
            </List>
          );
        })}
    </>
  );
};

export default Notification;
