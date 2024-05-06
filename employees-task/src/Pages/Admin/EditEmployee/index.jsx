import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeByID, putEmployee } from "../../../API/requests";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";

const positions = [
  "Frontend Developer",
  "Project Manager",
  "Backend Developer",
  "Marketing Manager",
  "Product Manager",
  "UX Designer",
  "Senior Backend Developer",
  "UI Designer",
];

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    surname: "",
    age: "",
    salary: "",
    position: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getEmployeeByID(id).then((data) => {
      setEmployee(data);
    });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function validateForm() {
    const errors = {};

    if (!employee.name || employee.name.length < 5) {
      errors.name = "Name must be at least 5 characters long.";
    }

    if (!employee.surname || employee.surname.length < 6) {
      errors.surname = "Surname must be at least 6 characters long.";
    }

    if (!employee.age || isNaN(employee.age) || employee.age <= 0) {
      errors.age = "Age must be a positive integer.";
    }

    if (
      !employee.salary ||
      isNaN(employee.salary) ||
      employee.salary <= 0 ||
      employee.salary > 2500
    ) {
      errors.salary =
        "Salary must be a positive number less than or equal to 2500.";
    }

    if (
      !employee.position ||
      ![
        "Frontend Developer",
        "Project Manager",
        "Backend Developer",
        "Marketing Manager",
        "Product Manager",
        "UX Designer",
        "Senior Backend Developer",
        "UI Designer",
      ].includes(employee.position)
    ) {
      errors.position = "Invalid job type.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      await putEmployee(id, employee);
      setEmployee({
        name: "",
        surname: "",
        age: "",
        salary: "",
        position: "",
        image: "",
      });
      navigate("/admin");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src={employee.image}
            alt="employee"
            width="300"
            height="300"
            style={{ margin: "50px auto", borderRadius: "20px" }}
          />
          <Typography variant="h4" align="center" gutterBottom>
            Edit Employee
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
          >
            <TextField
              value={employee.name}
              onChange={(e) => handleChange(e)}
              label="Employee Name"
              name="name"
              variant="outlined"
              margin="dense"
              style={{ marginRight: "20px", width: "300px" }}
              error={errors.name ? true : false}
              helperText={errors.name}
            />
            <TextField
              value={employee.surname}
              onChange={(e) => handleChange(e)}
              label="Employee Surname"
              name="surname"
              variant="outlined"
              margin="dense"
              style={{ marginRight: "20px", width: "300px" }}
              error={errors.surname ? true : false}
              helperText={errors.surname}
            />
            <TextField
              value={employee.age}
              onChange={(e) => handleChange(e)}
              label="Employee Age"
              name="age"
              variant="outlined"
              margin="dense"
              style={{ marginRight: "20px", width: "300px" }}
              error={errors.age ? true : false}
              helperText={errors.age}
            />
            <TextField
              value={employee.salary}
              onChange={(e) => handleChange(e)}
              label="Employee Salary"
              name="salary"
              variant="outlined"
              margin="dense"
              style={{ marginRight: "20px", width: "300px" }}
              error={errors.salary ? true : false}
              helperText={errors.salary}
            />
            <TextField
              select
              value={employee.position}
              onChange={(e) => handleChange(e)}
              label="Employee Position"
              name="position"
              variant="outlined"
              margin="dense"
              style={{ marginRight: "20px", width: "300px" }}
              error={errors.position ? true : false}
              helperText={errors.position}
            >
              {positions.map((position) => (
                <MenuItem key={position} value={position}>
                  {position}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!isFormValid}
            style={{ margin: "20px 0" }}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditEmployee;
