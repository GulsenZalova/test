import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../../../API/requests";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FavoritesContext } from "../../../context";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredEmployees = employees.filter((emp) => {
      const fullName = `${emp.name.toLowerCase()} ${emp.surname.toLowerCase()}`;
      return fullName.includes(searchValue);
    });
    setFilteredEmployees(filteredEmployees);
  };

  const handleFavoriteClick = (event, employee) => {
    event.preventDefault();
    const isAlreadyFavorite = localStorage.getItem(employee.id);
    if (isAlreadyFavorite) {
      Swal.fire("Error", "Employee is already in favorites.", "error");
    } else {
      localStorage.setItem(employee.id, JSON.stringify(employee));
      setFavoriteCount(favoriteCount + 1);
      Swal.fire("Success", "Added to favorites.", "success");
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteCount, setFavoriteCount }}>
      <>
        <Typography variant="h4" align="center" gutterBottom>
          Employees
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSearch}
          style={{
            width: "20%",
            margin: "0 auto",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : filteredEmployees.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            style={{ color: "red", fontSize: "40px" }}
          >
            Not Found
          </Typography>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              style={{ width: "100%", margin: "0 auto" }}
            >
              {filteredEmployees.map((employee) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={employee.id}>
                  <Card
                    style={{
                      width: "100%",
                      margin: "0 auto",
                      borderRadius: "10px",
                    }}
                    sx={{ maxWidth: 345 }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      image={employee.image}
                      alt={employee.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <Link
                          to={`/employees/${employee.id}`}
                          style={{
                            display: "block",
                            textAlign: "center",
                            textDecoration: "none",
                          }}
                        >
                          {employee.name} {employee.surname}
                        </Link>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Age: {employee.age}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Salary: {employee.salary}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Position: {employee.position}
                      </Typography>
                      <IconButton
                        onClick={(e) => handleFavoriteClick(e, employee)}
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
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </>
    </FavoritesContext.Provider>
  );
}

export default Employees;
