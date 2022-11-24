import { Container, Typography } from '@mui/material';

const ProfileQuote = ({
  quote,
  name,
}: {
  quote: string | undefined;
  name: string | undefined;
}) => {
  return (
    <Container sx={{ padding: '0 16px 21px 16px', fontSize: '14px' }}>
      <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
        {name}
      </Typography>
      {quote === null || quote === '' ? '자기소개 문구를 작성해 주세요' : quote}
    </Container>
  );
};

export default ProfileQuote;
