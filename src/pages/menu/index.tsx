import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { useMenuContext } from "../../providers/MenuProvider";

const MenuApp = () => {
  const { foodItems } = useMenuContext();

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

export default MenuApp;
