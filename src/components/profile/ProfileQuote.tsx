import { Container } from '@mui/material';

const ProfileQuote = ({
  quote = '',
  name = '',
}: {
  quote: string | undefined;
  name: string | undefined;
}) => {
  return (
    <Container sx={{ padding: '0 16px 21px 16px', fontSize: '14px' }}>
      {quote === '' ? quote : `${name}님 자기소개 문구를 작성해 보세요`}
    </Container>
  );
};

export default ProfileQuote;
