import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Box,Button, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: 'background.paper',
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditUser({ edituser,setEditOpen,fetchData,setSnackEditOpen }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const errorMsg={
  }
  const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const emailRegExp=
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .post("https://countriesnow.space/api/v0.1/countries/states", {
        country: country,
      })
      .then((response) => {
        // setStateOptions(response.data.data.states.map(state =>({
        //   value: state.name,
        //   label: state.name,
        //  })))
        let extractedValue = response.data.data.states.map(function (item) {
          return item["name"];
        });
        setStateOptions(extractedValue);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, [country]);
  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get("https://countriesnow.space/api/v0.1/countries/states")
      .then((response) => {
        // setCountryOptions(response.data.data.map(state => ({
        //   value: state.name,
        //   label: state.name,
        // })))
        let extractedValue = response.data.data.map(function (item) {
          return item["name"];
        });
        setCountryOptions(extractedValue);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (!edituser) {
      // dispatch(fetchUserById(id));
    } else {
      setFirstName(edituser.firstName);
      setLastName(edituser.lastName);
      setEmail(edituser.email);
      setMobile(edituser.mobile);
      setState(edituser.state);
      setCountry(edituser.country);
      setZipCode(edituser.zipCode);
    }
  }, [edituser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!emailRegExp.test(email)){
      errorMsg.email="Enter valid email"
    }else if(!phoneRegExp.test(mobile)){
      errorMsg.mobile="Enter valid mobile number"
    }
    console.log(errorMsg)
    if(errorMsg?.email!=="Enter valid email" && errorMsg?.mobile!=="Enter valid mobile number"){
    try {
      // const response = await axios.post("/api/users", values);
      const data = await axios.put(
        `http://localhost:5000/api/users/${edituser._id}`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: mobile,
          country: country,
          state: state,
          zipCode: zipCode,
        }
      ).then((res)=>{
        
        fetchData();
        setSnackEditOpen(true)
      }).catch((err)=>{
        console.log(err)
      });
    } catch (error) {
      console.error(error); // Handle error
    }
  }
    setEditOpen(false)
  };

  // Implement form input fields using MUI components

  return (
    <Box sx={{ ...style, width: 400 }}>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            label="First Name"
            value={firstName}
            inputProps={{
              minLength: 5,
            }}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
            sx={{ mt: 1.75 }}
          />
          <TextField
            name="lastName"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            inputProps={{
              minLength: 5,
            }}
            value={lastName}
            required
            fullWidth
            sx={{ mt: 1.75 }}
          />

          <TextField
            name="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            fullWidth
            required
            sx={{ mt: 1.75 }}
          />

          <TextField
            name="mobile"
            type="number"
            onChange={(e) => setMobile(e.target.value)}
            label="Mobile"
            value={mobile}
            fullWidth
            required
            sx={{ mt: 1.75 }}
          />

          <FormControl fullWidth sx={{ mt: 1.75 }}>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label="Country"
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              required
            >
              {countryOptions?.map((country) => {
                return <MenuItem value={country}>{country}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 1.75 }}>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              label="State"
              onChange={(e) => {
                setState(e.target.value);
              }}
              required
            >
              {stateOptions?.map((state) => {
                return <MenuItem value={state}>{state}</MenuItem>;
              })}
            </Select>
          </FormControl>

          <TextField
            name="zipCode"
            type="number"
            onChange={(e) => setZipCode(e.target.value)}
            value={zipCode}
            label="Zip Code"
            fullWidth
            required
            sx={{ mt: 1.75 }}
          />

          <Button sx={{ mt: 1.75 }} type="submit">Submit</Button>
        </form>
      </Box>
  );
}

export default EditUser;
