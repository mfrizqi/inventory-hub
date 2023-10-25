import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";

import "./Add.css";
import { LoadingButton } from "@mui/lab";

import { roles } from "../../../constants";

const AddModal = ({ isOpen, onClose, addItem }) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    const newProduct = {
      company: company,
      name: name,
      email: email,
      role: role,
      is_verified: true,
      status: "Banned"
    };

    onSubmit(newProduct);

    // Reset the form inputs
    setCompany("");
    setName("");
    setRole("");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_MOCK_API + "users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // setProduct([...product, data]);
        handleClose();
        addItem(true);
      } else {
        // Handle error response here if needed
        addItem(false);
        alert("Error sending product data to the API");
      }
    } catch (error) {
      // Handle any network errors or other issues
      addItem(false);
      alert("Error sending product data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const handleClose = (event, reason) => {
    //setOpen(false);
    onClose(event, reason);
  };

  const validation = (text) => text.length < 1;

  const isValid =
    validation(name) ||
    validation(role) ||
    validation(email) ||
    validation(company);

  console.log({ isValid });

  // const handleCheckEmail = (email) => {
  //   const re =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   if (re.test(email)) {
  //     // setEmailInvalid(false);
  //   } else {
  //     // setEmailInvalid(true);
  //   }
  // };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth={true}
        // maxWidth={maxWidth}
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={12} md={12}>
                <TextField
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  margin="dense"
                  id="company"
                  label="Company"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} md={12}>
                <TextField
                  id="roles"
                  select
                  defaultValue=""
                  label="Role"
                  margin="dense"
                  fullWidth
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={() => handleAdd()}
              disabled={isValid}
            >
              Submit
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

AddModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  addItem: PropTypes.func,
};

export default AddModal;
