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
import useTable_Table from "../../components/useTable_Table";
  
  const useStyles = makeStyles((theme) => ({
    pageContent: {
      [theme.breakpoints.up("sm")]: {
          margin: theme.spacing(5),
        },
      
      padding: theme.spacing(3),
    },
    searchInput: {
      width: "75%",
    },
    newButton: {
      // [theme.breakpoints.up("sm")]: {
      //     // position: "absolute",
      //     // position: "static",
      //     // right: "16px",
      //     left: "52px",
      // },
      [theme.breakpoints.down("sm")]: {
          // marginRight: "22px",
          // display:"none"
      },
      position: "absolute",
      right: "16px",
    },
  }));
  
  const headCells = [
      { id: "fullName", label: "Employee Name" },
      { id: "email", label: "Email Address (Personal)" },
      { id: "mobile", label: "Mobile Number" },
      { id: "department", label: "Department", disableSorting: true },
      { id: "actions", label: "Actions", disableSorting: true },
    ];
  
  export default function Employees_Table() {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
    const classes = useStyles();
    const [filterFn, setFilterFn] = useState({
      fn: (items) => {
        return items;
      },
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [records, setRecords] = useState(employeeService.getAllEmployees());
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable_Table(records, headCells, filterFn);
    
    const [notify, setNotify] = useState({
      isOpen: false,
      message: "",
      type: "",
    });
    const [confirmDialog, setConfirmDialog] = useState({
      isOpen: false,
      title: "",
      subTitle: "",
    });
  
    const handleSearch = (e) => {
      let target = e.target;
      setFilterFn({
        fn: (items) => {
          if (target.value == "") return items;
          else
            return items.filter((x) =>
              x.fullName.toLowerCase().includes(target.value)
            );
        },
      });
    };
  
    const addOrEdit = (employee, resetForm) => {
      if (employee.id == 0) employeeService.insertEmployee(employee);
      else employeeService.updateEmployee(employee);
      resetForm();
      setRecordForEdit(null);
      setOpenPopup(false);
      setRecords(employeeService.getAllEmployees());
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    };
  
    const openInPopup = (item) => {
      setRecordForEdit(item);
      setOpenPopup(true);
    };
  
    const onDelete = (id) => {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      employeeService.deleteEmployee(id);
      setRecords(employeeService.getAllEmployees());
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "error",
      });
    };
  
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
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Employees"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
  
            <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
          </Toolbar>
  
          <TblContainer>
            <TblHead />
            <TableBody>
              {
                // records.map(item =>
                recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.mobile}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>
                      <Controls.ActionButton color="primary">
                        <EditOutlinedIcon
                          fontSize="small"
                          onClick={() => {
                            openInPopup(item);
                          }}
                        />
                      </Controls.ActionButton>
  
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(item.id);
                            },
                          });
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </TblContainer>
          {/* <TblPagination /> */}
        </Paper>
      </>
    );
  }
  