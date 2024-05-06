import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEmployeeByID, getAllEmployees } from "../../../API/requests";
import { Table } from "antd";
import { Button, Typography } from "@mui/material";
import Swal from "sweetalert2";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((data) => {
      setEmployees(data);
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="employee"
          style={{ width: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Salary $",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteEmployeeByID(record.id);
                  let filteredEmployees = employees.filter(
                    (emp) => emp.id !== record.id
                  );
                  setEmployees(filteredEmployees);
                  Swal.fire(
                    "Deleted!",
                    "Your file has been deleted.",
                    "success"
                  );
                }
              });
            }}
          >
            Delete
          </Button>
          <Link to={`/admin/employees/edit/${record.id}`}>
            {" "}
            <Button variant="contained">Edit</Button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Employees
      </Typography>
      <Table columns={columns} dataSource={employees} />
    </>
  );
};

export default Employees;
