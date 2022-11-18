import { Box, Typography, Container } from '@mui/material';

const ProfileCounter = ({
  postCount = 0,
  followerCount = 0,
  followCount = 0,
}: {
  postCount: number | undefined;
  followerCount: number | undefined;
  followCount: number | undefined;
}) => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0 12px 0',
        borderTop: '1px solid #dbdbdb',
        borderBottom: '1px solid #dbdbdb',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontSize: '14px', color: '#828282' }}>
          게시물
        </Typography>
        <Typography
          sx={{ fontSize: '14px', fontWeight: 700, color: '#262626' }}
        >
          {postCount.toLocaleString()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontSize: '14px', color: '#828282' }}>
          팔로워
        </Typography>
        <Typography
          sx={{ fontSize: '14px', fontWeight: 700, color: '#262626' }}
        >
          {followerCount.toLocaleString()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontSize: '14px', color: '#828282' }}>
          팔로우
        </Typography>
        <Typography
          sx={{ fontSize: '14px', fontWeight: 700, color: '#262626' }}
        >
          {followCount.toLocaleString()}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProfileCounter;
