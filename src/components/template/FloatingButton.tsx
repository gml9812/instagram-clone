import { Box, Fab, Slide, styled, SxProps, Theme } from '@mui/material';
import COLOR from '@styles/colors';

interface Props {
  sx: SxProps<Theme> | undefined;
  title: string;
  isShow: boolean;
  handleClick: () => void;
}

const CssFab = styled(Fab)({
  position: 'fixed',
  zIndex: 99999,
  top: '65px',
  width: '75px',
  background: COLOR.BG,
  boxShadow: `0px 1px 9px -5px ${COLOR.CHARCOAL}`,
  '&:hover': {
    background: COLOR.BG,
  },
  '&:active': {
    background: COLOR.LIGHTGREY,
    boxShadow: `0px 1px 9px -5px ${COLOR.CHARCOAL}`,
  },
});

const FloatingButton = ({ sx, title, isShow, handleClick }: Props) => {
  return (
    <Box sx={{ ...sx }}>
      <Slide direction="down" in={isShow} mountOnEnter unmountOnExit>
        <CssFab
          variant="extended"
          size="small"
          color="primary"
          onClick={handleClick}
        >
          <Box sx={{ fontSize: '1.1rem', color: COLOR.CHARCOAL }}>{title}</Box>
        </CssFab>
      </Slide>
    </Box>
  );
};

export default FloatingButton;
