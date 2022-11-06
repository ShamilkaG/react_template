import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Controls } from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import useTable from "../../components/useTable";
import * as employeeService from "../../services/employeeService";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";



export default function Employees() {
    const [tableData, setTableData] = useState([
        { name: "Raj", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", fee: 78456 },
        { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
        { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
        { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
        { name: "Neha", email: "neha@gmail.com", phone: 7845621301, age: 25, gender: "F", city: "Patna", fee: 748521 },
        { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
        { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
        { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
        { name: "Raj", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", fee: 78456 },
        { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
        { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
        { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
      ])
      const columns = [
        { title: "Name", field: "name", sorting: false, filtering: false, cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" } },
        { title: "Email", field: "email", filterPlaceholder: "filter" },
        { title: "Phone Number", field: "phone", align: "center", grouping: false },
        {
          title: "Age", field: "age", emptyValue: () => <em>null</em>,
          render: (rowData) => <div style={{ background: rowData.age >= 18 ? "#008000aa" : "#f90000aa",borderRadius:"4px",paddingLeft:5 }}>{rowData.age >= 18 ? "18+" : "18-"}</div>,
           searchable: false, export: false
        },
        { title: "Gender", field: "gender", lookup: { M: "Male", F: "Female" } },
        { title: "City", field: "city",filterPlaceholder:"filter" },
        { title: "School Fee", field: "fee", type: "currency", currencySetting: { currencyCode: "INR", minimumFractionDigits: 1 },
        cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" } },
      ]
  
  const { TblContainer } =
  useTable(columns,tableData, setTableData);
const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <PageHeader
        title="New Employee"
        subTitle="Form design with validation"
        icon={
          isMdUp ? (
            <PeopleOutlineIcon fontSize="large" />
          ) : (
            <PeopleOutlineIcon fontSize="small" />
          )
        }
      ></PageHeader>
      <div >
        <TblContainer></TblContainer>
      </div>
      
    </>
  );
}
