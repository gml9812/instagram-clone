import { Avatar, Box, Typography, Button } from '@mui/material';

const ProfileHeader = ({
  profileImage,
  name,
}: {
  profileImage: string | undefined;
  name: string | undefined;
}) => {
  return (
    <Box
      sx={{
        margin: '16px 16px 24px 16px',
        height: '90px',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginRight: '28px',
        }}
      >
        <Avatar
          alt="profile"
          sx={{
            height: '77px',
            width: '77px',
          }}
          src={profileImage}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box>
          {/* <Button
            variant="outlined"
            sx={{
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: '18px',
              color: '#262626',
              border: '1px solid #dbdbdb',
              padding: '5px 9px',
              marginRight: '8px',
            }}
          >
            팔로잉
          </Button> */}
          <Button
            variant="outlined"
            sx={{
              fontSize: '14px',
              fontWeight: 700,
              lineHeight: '18px',
              color: '#262626',
              border: '1px solid #dbdbdb',
              padding: '5px 9px',
              marginRight: '8px',
            }}
          >
            메시지 보내기
          </Button>
          {/* <IconButton
            sx={{
              color: '#262626',
              border: '1px solid #dbdbdb',
              borderRadius: '4px',
              padding: '5px 9px',
            }}
          >
            <PersonAddOutlinedIcon />
          </IconButton> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
