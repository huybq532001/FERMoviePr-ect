import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Grid, CardMedia, Box, Modal } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import DescriptionIcon from '@mui/icons-material/Description';
// import CloseIcon from '@mui/icons-material/Close';

export default function DetailNews() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
//   const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchFilmDetails() {
      try {
        const response = await fetch(`https://653be1b9d5d6790f5ec7962f.mockapi.io/api/lab/news/${id}`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching film details: ", error);
      }
    }

    fetchFilmDetails();
  }, [id]);



  if (!news) {
    return <div>Loading...</div>;
  }

  return (

    <Card sx={{ px: 30, pt: 15, pb: 10, backgroundColor:'#988899'  }}>

      <Grid><Typography fontSize={80}>DETAIL NEWS</Typography></Grid>,
      <Grid sx={{ position: 'relative' }}>
        <CardMedia component="img" image={news.img} alt={news.name} />
      </Grid>

      <CardContent sx={{backgroundColor: 'white'}}>
        <Box display="flex" alignItems="center">
          <BadgeIcon />
          <Grid item xs={10}>
            <Typography item xs='1' variant='h4' sx={{ px: 3 }}>{news.name}</Typography>
          </Grid>
        </Box>
        <Box display="flex" alignItems="center">
          <DescriptionIcon sx={{padding:'0 20px 0 0'}} />
          <Grid item xs={10}>
            <Typography item xs='1' variant='body 1' sx={{ textAlign: 'justify', px: 3 }} >{news.content}</Typography>
          </Grid>
        </Box>

      </CardContent>
      <Modal>
        <Box
          sx={{
            
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            maxWidth: '80%',
            maxHeight: '80%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        </Box>
      </Modal>


    </Card>
  );
}
