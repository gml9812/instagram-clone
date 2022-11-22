import React from 'react';
import { Post } from '@queries/post';
import { Box, Tabs, Tab, Grid } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import PortraitIcon from '@mui/icons-material/Portrait';
import Image from 'next/image';

const ProfileGrid = ({
  value,
  posts = [],
}: {
  value: number;
  posts: Post[] | undefined;
}) => {
  if (value === 0) {
    return (
      <Grid container>
        {posts.map((post: Post) => {
          return (
            <Grid item xs={4} key={post.id}>
              <Image
                src={post.medias[0].url}
                alt=""
                width={post.medias[0].width}
                height={post.medias[0].height}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
  if (value === 1) {
    return <div>only movies</div>;
  }
  return <div>only pics</div>;
};

const ProfilePosts = ({ posts }: { posts: Post[] | undefined }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label={<GridOnIcon fontSize="large" />} />
          <Tab label={<SlideshowIcon fontSize="large" />} />
          <Tab label={<PortraitIcon fontSize="large" />} />
        </Tabs>
      </Box>
      <ProfileGrid value={value} posts={posts} />
    </>
  );
};

export default ProfilePosts;
