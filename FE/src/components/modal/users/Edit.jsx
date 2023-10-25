import { useEffect, useState } from "react";
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

import "./Edit.css";
import { LoadingButton } from "@mui/lab";

import { roles } from "../../../constants";

const EditModal = ({ isOpen, onClose, data, editItem }) => {
  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.name);
    // console.log(e.target.value);
    // console.log(name, value);
    setEditedData((data) => ({
      ...data,
      [name]: value,
    }));
    console.log(editedData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editedData);
    onSubmit(editedData);
  };

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      // Make the API request to send the user data
      const response = await fetch(
        import.meta.env.VITE_MOCK_API + "/users/" + data?.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        }
      );

      if (response.ok) {
        // If the API call is successful, add the product to the state
        editItem(true);
        handleClose();
        // setProduct([...product, data]);
      } else {
        // Handle error response here if needed
        editItem(false);
        alert("Error sending product data to the API");
      }
    } catch (error) {
      // Handle any network errors or other issues
      editItem(false);
      alert("Error sending product data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const handleClose = (event, reason) => {
    setEditedData(null);
    onClose(event, reason);
  };

  const validation = (text) => text.length < 1;

  const isValid = false;
    // validation(editedData.name) ||
    // validation(editedData.role) ||
    // validation(editedData.email) ||
    // validation(editedData.company);

  console.log({ isValid });
  console.log({data})
  console.log({editedData})

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
        <DialogTitle>Edit User</DialogTitle>
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
                  name="name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={data.name}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  name="email"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={data.email}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  margin="dense"
                  id="company"
                  label="Company"
                  name="company"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={data.company}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={4} md={12}>
                <TextField
                  id="role"
                  name="role"
                  select
                  label="Role"
                  margin="dense"
                  fullWidth
                  defaultValue={data.role}
                  onChange={handleInput}
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
              onClick={(e) => handleSubmit(e)}
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

EditModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.object,
  editItem: PropTypes.func,
};

export default EditModal;
