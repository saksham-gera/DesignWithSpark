import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
  Grid,
  Container,
  Modal
} from '@mui/material';
import { Link } from 'react-router-dom';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(import.meta.env.VITE_BACKEND_SERVER + '/orders/', {
          headers: { Authorization: token }
        });

        const ordersWithBase64 = await Promise.all(
          response.data.map(async order => {
            const imgResponse = await fetch(order.image_link);
            const blob = await imgResponse.blob();

            const base64 = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });

            return { ...order, base64 };
          })
        );

        setOrders(ordersWithBase64);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOpenModal = (imageSrc) => {
    setModalImage(imageSrc);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImage('');
  };

  const handleDownload = (base64, filename) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!orders.length) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="text.secondary">No orders found.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Grid container spacing={3}>
          {orders.map(order => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card sx={{
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: 3,
                overflow: 'hidden'
              }}>
                <Box
                  onClick={() => handleOpenModal(order.image_link)}
                  sx={{ cursor: 'pointer', height: 200, overflow: 'hidden' }}
                >
                  <CardMedia
                    component="img"
                    image={order.image_link}
                    alt="Order"
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
                    Order ID: {order.rzp_orderid}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Payment ID: {order.rzp_paymentid}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Price: ₹{order.price}
                  </Typography>
                  <Link to="/createnew" state={{ full: order.base64 }} style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" color="success" fullWidth sx={{ mt: 1 }}>
                      Show On Model
                    </Button>
                  </Link>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => handleDownload(order.base64, `${order._id}.jpg`)}
                  >
                    Download Image
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <img
            src={modalImage}
            alt="Zoomed"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default Orders;