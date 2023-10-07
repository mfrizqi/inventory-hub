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

import {currencies, types, roles} from '../../../constants'

const AddModal = ({ isOpen, onClose, addItem}) => {

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  // const [currency, setCurrency] = useState("IDR");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("pcs");
  const [loading, setLoading] = useState(false);

  const handleAddProduct = () => {
    const newProduct = {
      code: company,
      name: name,
      email: email,
      price: parseInt(price),
      type: type,
      quantity: parseInt(quantity),
      unit: unit,
    };

    onSubmit(newProduct);

    // Reset the form inputs
    setCompany("");
    setName("");
    setPrice("");
    setType("");
    setQuantity("");
  };

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await fetch(import.meta.env.VITE_MOCK_API + "products", {
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
      setLoading(false)
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
    validation(company) ||
    validation(name) ||
    validation(price) ||
    validation(type) ||
    validation(quantity);

  console.log({ isValid });

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
              <Grid item xs={12} md={6}>
                <TextField
                  autoFocus
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
              <Grid item xs={12} md={6}>
                <TextField
                  autoFocus
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
              <Grid item xs={12} md={6}>
                <TextField
                  autoFocus
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
              <Grid item xs={4} md={6}>
                <TextField
                  id="roles"
                  select
                  value={unit}
                  margin="dense"
                  fullWidth
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/* <Grid item xs={3} md={2}>
                <TextField
                  id="currency"
                  select
                  value={currency}
                  margin="dense"
                  fullWidth
                  onChange={(e) => {
                    setCurrency(e.target.value);
                  }}
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
                  autoFocus
                  margin="dense"
                  id="price"
                  label="Price"
                  type="number"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  id="type"
                  select
                  defaultValue=""
                  margin="dense"
                  label="Type"
                  fullWidth
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
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
                  autoFocus
                  margin="dense"
                  id="quantity"
                  label="Quantity"
                  type="number"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <TextField
                  id="unit"
                  select
                  value={unit}
                  margin="dense"
                  fullWidth
                  onChange={(e) => {
                    setUnit(e.target.value);
                  }}
                >
                  {units.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}
            </Grid>
          </Box>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={() => handleAddProduct()}
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
  currencies: PropTypes.array
};

export default AddModal;
