import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  TextField,
  MenuItem,
  // TextField,
} from "@mui/material";
import PropTypes from "prop-types";

import { currencies, types, units } from "../../../constants";
import { LoadingButton } from "@mui/lab";

const EditProduct = ({ isOpen, onClose, data, editItem }) => {
  const [fullWidth] = useState(true);
  const [maxWidth] = useState("sm");

  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState(data);

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(name, value);
    setEditedData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(editedData);
    onSubmit(editedData);
  };

  if (!isOpen) {
    return null;
  }

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      // Make the API request to send the product data
      const response = await fetch(
        import.meta.env.VITE_MOCK_API + "/products/" + data?.id,
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

  const handleClose = (event, reason) => {
    onClose(event, reason);
  };

  const validation = (text) => text.length < 1;

  const isValid =
    validation(editedData.code) ||
    validation(editedData.name) ||
    validation(editedData.price) ||
    validation(editedData.type) ||
    validation(editedData.quantity);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle>Edit Product</DialogTitle>
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
              <Grid item xs={12} md={6}>
                <TextField
                  id="code"
                  label="Code"
                  name="code"
                  type="text"
                  fullWidth
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  defaultValue={data.code}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="name"
                  label="Name"
                  name="name"
                  type="text"
                  fullWidth
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  defaultValue={data.name}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={3} md={2}>
                <TextField
                  id="currency"
                  name="currency"
                  margin="dense"
                  select
                  fullWidth
                  variant="outlined"
                  defaultValue={data.currency}
                  onChange={handleInput}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={9} md={10}>
                <TextField
                  id="price"
                  label="Price"
                  name="price"
                  type="number"
                  margin="dense"
                  autoFocus
                  fullWidth
                  variant="outlined"
                  defaultValue={data.price}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  id="type"
                  margin="dense"
                  label="Type"
                  name="type"
                  select
                  fullWidth
                  defaultValue={data.type}
                  onChange={handleInput}
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={8} md={4}>
                <TextField
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  type="number"
                  fullWidth
                  autoFocus
                  margin="dense"
                  variant="outlined"
                  defaultValue={data.quantity}
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <TextField
                  id="unit"
                  name="unit"
                  fullWidth
                  select
                  margin="dense"
                  onChange={handleInput}
                  defaultValue={data.unit}
                >
                  {units.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
          
        </DialogContent>
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
      </Dialog>
    </>
  );
};

EditProduct.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.object,
  editItem: PropTypes.func,
};

export default EditProduct;
