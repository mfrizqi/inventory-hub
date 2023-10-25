import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  DialogActions,
} from "@mui/material";
// components
import Label from "../material-kit/components/label";
import Iconify from "../material-kit/components/iconify/Iconify";
// sections
import UserListHead from "../material-kit/sections/@dashboard/user/UserListHead";
import UserListToolbar from "../material-kit/sections/@dashboard/user/UserListToolbar";
// ----------------------------------------------------------------------
import AddModal from "../components/modal/users/Add";
import EditModal from "../components/modal/users/Edit";
// ----------------------------------------------------------------------
import SimpleBarReact from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import axios from "axios";
import { LoadingButton } from "@mui/lab";

const USERLIST = [
  {
    name: "eaylmer0",
    company: "Meezzy",
    role: "Financial Analyst",
    is_verified: true,
    status: "BANNED",
  },
  {
    name: "amerveille1",
    company: "Thoughtstorm",
    role: "Senior Sales Associate",
    is_verified: false,
    status: "BANNED",
  },
  {
    name: "iocollopy2",
    company: "Katz",
    role: "Quality Control Specialist",
    is_verified: true,
    status: "ACTIVE",
  },
  {
    name: "jeuler3",
    company: "Mydo",
    role: "Community Outreach Specialist",
    is_verified: false,
    status: "BANNED",
  },
  {
    name: "ktothe4",
    company: "Mydo",
    role: "Web Designer I",
    is_verified: false,
    status: "BANNED",
  },
  {
    name: "hcoard5",
    company: "Topicshots",
    role: "Nuclear Power Engineer",
    is_verified: false,
    status: "",
  },
  {
    name: "klorek6",
    company: "Skyble",
    role: "Junior Executive",
    is_verified: false,
    status: "ACTIVE",
  },
  {
    name: "rbier7",
    company: "Quatz",
    role: "Nurse",
    is_verified: false,
    status: "",
  },
  {
    name: "fkoopman8",
    company: "Agivu",
    role: "Nuclear Power Engineer",
    is_verified: false,
    status: "BANNED",
  },
  {
    name: "heustes9",
    company: "Eadel",
    role: "Statistician III",
    is_verified: true,
    status: "ACTIVE",
  },
  {
    name: "rspinksa",
    company: "Babblestorm",
    role: "Engineer III",
    is_verified: true,
    status: "BANNED",
  },
  {
    name: "abourrelb",
    company: "Gabspot",
    role: "Marketing Assistant",
    is_verified: true,
    status: "",
  },
  {
    name: "fianielloc",
    company: "Feedfire",
    role: "Structural Analysis Engineer",
    is_verified: false,
    status: "ACTIVE",
  },
  {
    name: "vbraxtond",
    company: "Bubbletube",
    role: "VP Sales",
    is_verified: false,
    status: "",
  },
  {
    name: "amarke",
    company: "Gabtype",
    role: "Design Engineer",
    is_verified: false,
    status: "BANNED",
  },
  {
    name: "lpagetf",
    company: "Yozio",
    role: "Web Developer I",
    is_verified: false,
    status: "BANNED",
  },
  {
    name: "vhorbartg",
    company: "InnoZ",
    role: "Analog Circuit Design manager",
    is_verified: true,
    status: "BANNED",
  },
  {
    name: "rcollardh",
    company: "Tekfly",
    role: "Chief Design Engineer",
    is_verified: true,
    status: "",
  },
  {
    name: "zdarwenti",
    company: "Flipopia",
    role: "GIS Technical Architect",
    is_verified: false,
    status: "",
  },
  {
    name: "sgauchej",
    company: "Cogidoo",
    role: "Administrative Officer",
    is_verified: true,
    status: "ACTIVE",
  },
];

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "company", label: "Company", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { id: "isVerified", label: "Verified", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function UserPage() {
  const [open, setOpen] = useState();

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    console.log(import.meta.env);
    getUsers();
  }, []);

  const handleClickOpen = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = (event, reason) => {
    console.log(event);
    console.log(reason);
    if ((reason && reason === "backdropClick") || reason === "escapeKeyDown")
      return;
    if (!reason) {
      // showAlert({
      //   type: "success",
      //   message: "Adding data successful!",
      // });
    }
    setShowModal(false);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
    getUsers(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  // const filteredUsers = applySortFilter(
  //   USERLIST,
  //   getComparator(order, orderBy),
  //   filterName
  // );

  const getUsers = (search = '') => {
    let url = new URL(import.meta.env.VITE_MOCK_API + "users");

    // Sort Request
    url.searchParams.append("sortBy", orderBy);
    url.searchParams.append("order", order); // order parameter is optional and will default to `asc`

    if (search !== "") {
      url.searchParams.append("name", search);
    }
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleEdit = () => {
    setEditModal(!editModal);
    setOpen(null);
  };

  const handleCloseEdit = (event, reason) => {
    console.log(event);
    console.log(reason);
    if ((reason && reason === "backdropClick") || reason === "escapeKeyDown")
      return;

    if (!reason) {
      // showAlert({
      //   type: "success",
      //   message: "Editing data successful!",
      // });
    }
    setEditModal(false);
  };

  const handleCloseDelete = (event, reason) => {
    console.log(event);
    console.log(reason);
    if ((reason && reason === "backdropClick") || reason === "escapeKeyDown")
      return;
    setDeleteModal(false);
  };

  const submitDelete = () => {
    setLoadingDelete(true);
    axios
      .delete(import.meta.env.VITE_MOCK_API + "users/" + edit?.id)
      .then(() => {
        setFilterName("");
        setLoadingDelete(false);
        handleCloseDelete();
        // showAlert({
        //   type: "success",
        //   message: "Successfully delete data !",
        // });
        getUsers();
      })
      .catch((err) => {
        console.log(err);
        setLoadingDelete(false);
      });
  };

  const handleOpenDelete = () => {
    handleOpenMenu(false);
    setDeleteModal(true);
  };

  const capitalize = (str) => {
    const capsSplit = str.split("_");

    for (let i = 0; i < capsSplit.length; i++) {
      capsSplit[i] = capsSplit[i][0].toUpperCase() + capsSplit[i].substr(1) + ' ';
    }
    capsSplit.join(" ");
    return capsSplit;
  };

  const isNotFound = !users.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>

          {users.length != 0 && (
            <Button
              variant="contained"
              onClick={handleClickOpen}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New User
            </Button>
          )}
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <TableContainer sx={{ minWidth: 800, height: 450 }}>
            <SimpleBarReact style={{ maxHeight: 450 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {loading ? (
                  <TableBody>
                    <TableCell align="center" colSpan={6} sx={{ py: 6, my: 6 }}>
                      <CircularProgress size={30} />
                    </TableCell>
                  </TableBody>
                ) : (
                  <TableBody>
                    {users
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((row) => {
                        const {
                          id,
                          name,
                          role,
                          status,
                          company,
                          avatarUrl,
                          isVerified,
                        } = row;
                        const selectedUser = selected.indexOf(name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedUser}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedUser}
                                onChange={(event) => handleClick(event, name)}
                              />
                            </TableCell>

                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={name} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell align="left">{company}</TableCell>

                            <TableCell align="left">
                              {capitalize(role)}
                            </TableCell>

                            <TableCell align="left">
                              {isVerified ? "Yes" : "No"}
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                color={
                                  (status.length < 6 && "error") || "success"
                                }
                              >
                                {status}
                              </Label>
                            </TableCell>

                            <TableCell align="right">
                              <IconButton
                                size="large"
                                color="inherit"
                                onClick={(event) => {
                                  handleOpenMenu(event);
                                  setEdit(row);
                                }}
                              >
                                <Iconify icon={"eva:more-vertical-fill"} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                )}
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </SimpleBarReact>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      {/* Modal */}
      <AddModal
        isOpen={showModal}
        onClose={(event, reason) => handleCloseModal(event, reason)}
        addItem={() => getUsers()}
      />

      <EditModal
        isOpen={editModal}
        onClose={(event, reason) => handleCloseEdit(event, reason)}
        data={edit}
        editItem={() => getUsers()}
      />

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: "error.main" }} onClick={handleOpenDelete}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog
        open={deleteModal}
        onClose={(event, reason) => handleCloseDelete(event, reason)}
        maxWidth="xs"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You want to delete <b>{edit?.name}</b> <br />
            This action is{" "}
            <Box component="span" sx={{ color: "error.main" }}>
              irreversible
            </Box>
            .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <LoadingButton
            loading={loadingDelete}
            variant="contained"
            color="error"
            onClick={() => submitDelete()}
            autoFocus
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
