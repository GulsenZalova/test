import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../../context";
import { Button, TextField } from "@mui/material";

const { Column } = Table;

function Favorites() {
  const [favoriteEmployees, setFavoriteEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const favorites = Object.entries(localStorage).map(([key, value]) =>
      JSON.parse(value)
    );
    setFavoriteEmployees(favorites);
  }, []);

  const handleClearAllFavorites = () => {
    localStorage.clear();
    setFavoriteEmployees([]);
  };

  const handleRemoveFavorite = (employeeId) => {
    localStorage.removeItem(employeeId);
    setFavoriteEmployees((prevFavorites) =>
      prevFavorites.filter((employee) => employee.id !== employeeId)
    );
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredEmployees = favoriteEmployees.filter((employee) =>
    `${employee.name} ${employee.surname}`
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  return (
    <FavoritesContext.Provider value={{}}>
      <>
        <Typography variant="h4" align="center" gutterBottom>
          Favorites
        </Typography>
        <Button
          variant="outlined"
          type="primary"
          style={{ margin: "20px auto", display: "block" }}
          onClick={handleClearAllFavorites}
        >
          Clear All
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSearchChange}
          style={{
            width: "20%",
            margin: "0 auto",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
        <Table dataSource={filteredEmployees} pagination={false}>
          <Column
            title="Name"
            dataIndex="name"
            key="name"
            render={(text, record) => (
              <Link to={`/employees/${record.id}`}>{text}</Link>
            )}
          />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Salary" dataIndex="salary" key="salary" />
          <Column title="Position" dataIndex="position" key="position" />
          <Column
            title="Actions"
            key="actions"
            render={(text, record) => (
              <Button
                type="link"
                danger
                onClick={() => handleRemoveFavorite(record.id)}
              >
                Delete
              </Button>
            )}
          />
        </Table>
      </>
    </FavoritesContext.Provider>
  );
}

export default Favorites;
