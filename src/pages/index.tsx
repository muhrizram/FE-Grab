import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Sidebar from "../components/Sidebar";

const Menu = () => {
  const foodItems = [
    {
      name: "Omelet Jepang dengan Kuah Kari",
      image: "/assets/image/omelet_curry.jpg",
      description: "Omelet khas Jepang disajikan dengan kuah kari yang gurih.",
      price: "Rp. 25.000",
    },
    {
      name: "Omelet Jepang dengan Kuah Blackpepper",
      image: "/assets/image/omelet_blackpepper.jpg",
      description:
        "Omelet khas Jepang disajikan dengan kuah lada hitam yang pedas.",
      price: "Rp. 27.000",
    },
    {
      name: "Omelet Jepang dengan Kuah Gulai",
      image: "/assets/image/omelet_gulai.jpg",
      description:
        "Omelet khas Jepang disajikan dengan kuah gulai yang kaya rempah.",
      price: "Rp. 28.000",
    },
    {
      name: "Omelet Jepang dengan Kuah Gulai",
      image: "/assets/image/omelet_gulai.jpg",
      description:
        "Omelet khas Jepang disajikan dengan kuah gulai yang kaya rempah.",
      price: "Rp. 28.000",
    },
  ];
  return (
    <Sidebar>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {foodItems.map((food, index) => (
          <Card key={index} sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              height="140"
              image={food.image}
              alt={food.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {food.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {food.description}
              </Typography>
              <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
                {food.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Pesan Sekarang
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Sidebar>
  );
};

export default Menu;
