import React from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { postEmployee } from "../../../API/requests";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
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

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Employee name is required")
    .min(5, "Minimum length: 5 characters"),
  surname: yup
    .string()
    .required("Employee surname is required")
    .min(6, "Minimum length: 6 characters"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
  salary: yup
    .number()
    .required("Salary is required")
    .positive("Salary must be a positive number")
    .max(2500, "Salary cannot be greater than 2500"),
  position: yup
    .string()
    .required("Position is required")
    .oneOf(positions, "Invalid position"),
  image: yup.string().url("Image URL must be a valid URL"),
});

const AddEmployee = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      age: "",
      salary: "",
      position: "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.id = nanoid();
      console.log(values);
      await postEmployee(values);
      formik.resetForm();
      navigate("/admin");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const isDisabled = !formik.isValid;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Employee
      </Typography>
      <Box display="flex" flexDirection="column">
        <TextField
          id="name"
          name="name"
          label="Employee Name"
          variant="outlined"
          margin="dense"
          type="text"
          {...formik.getFieldProps("name")}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="surname"
          name="surname"
          label="Employee Surname"
          variant="outlined"
          margin="dense"
          type="text"
          {...formik.getFieldProps("surname")}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
        />
        <TextField
          id="age"
          name="age"
          label="Age"
          variant="outlined"
          margin="dense"
          type="number"
          {...formik.getFieldProps("age")}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
        />
        <TextField
          id="salary"
          name="salary"
          label="Salary"
          variant="outlined"
          margin="dense"
          type="number"
          {...formik.getFieldProps("salary")}
          error={formik.touched.salary && Boolean(formik.errors.salary)}
          helperText={formik.touched.salary && formik.errors.salary}
        />
        <TextField
          id="position"
          name="position"
          select
          label="Position"
          variant="outlined"
          margin="dense"
          type="text"
          InputLabelProps={{ shrink: true }}
          {...formik.getFieldProps("position")}
          SelectProps={{ native: true }}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
        >
          <option value="">Choose Position</option>
          {positions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>

        <TextField
          id="image"
          name="image"
          label="Image URL"
          variant="outlined"
          margin="dense"
          type="url"
          {...formik.getFieldProps("image")}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isDisabled}
          sx={{ mt: 2 }}
        >
          Add Employee
        </Button>
      </Box>
    </form>
  );
};

export default AddEmployee;
