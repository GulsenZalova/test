import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeByID } from "../../../API/requests";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { toast } from "react-hot-toast";

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getEmployeeByID(id).then((data) => {
      setEmployee(data);
    });
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === id));
  }, [id]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.some((fav) => fav.id === employee.id)) {
      toast.error("Employee is already in favorites");
    } else {
      const updatedFavorites = [...favorites, employee];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true);
      toast.success("Added to favorites");
    }
  };

  return (
    <>
      <Card
        style={{ width: "100%", margin: "0 auto" }}
        sx={{ maxWidth: 345, mb: 2 }}
      >
        <CardMedia
          align="center"
          component="img"
          height="300"
          image={employee.image}
          alt={employee.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {employee.name} {employee.surname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {employee.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age: {employee.age}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Salary$: {employee.salary}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Position: {employee.position}
          </Typography>
          {!isFavorite ? (
            <IconButton
              onClick={handleFavoriteClick}
              aria-label="add to favorites"
              sx={{
                color: "orange",
                borderRadius: "10px",
                boxShadow: "1px 1px 1px black",
                top: "0",
              }}
            >
              <Favorite />
            </IconButton>
          ) : (
            <IconButton
              aria-label="added to favorites"
              disabled
              sx={{
                color: "orange",
                borderRadius: "10px",
                boxShadow: "1px 1px 1px black",
                top: "0",
              }}
            >
              <Favorite />
            </IconButton>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default EmployeeDetail;
