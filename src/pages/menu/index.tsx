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
import PaginationComp from "../../components/PaginationComp";
import DataNotFound from "../../components/DataNotFound";

const MenuApp = () => {
  const {
    foodItems,
    foodId,
    handleSubmit,
    totalPages,
    page,
    handlePageChange,
  } = useMenuContext();

  return (
    <Sidebar>
      {foodItems.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              my: "20px",
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
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ mt: 1 }}
                  >
                    {Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Number(food.price))}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    disabled={foodId.includes(food.id)}
                    color="primary"
                    onClick={() => handleSubmit(food)}
                  >
                    Pesan Sekarang
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <PaginationComp
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </Box>
        </>
      ) : (
        <DataNotFound />
      )}
    </Sidebar>
  );
};

export default MenuApp;
