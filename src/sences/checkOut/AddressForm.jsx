import React from "react";
import { Box, useMediaQuery, TextField } from "@mui/material";
// What is getIN
// getIn is a utility function in Formik. use for extract a deeply nested value from an object by using its path.
import { getIn } from "formik";

const AddressForm = ({
  type,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  //For better code understandibility
  const formatedName = (field) => `${type}.${field}`;

  //For overall error
  const formatedError = (field) =>
    Boolean(
      //Touched to check the type name is coorect or not, error given when name not to match
      getIn(touched, formatedName(field)) && getIn(errors, formatedName(field))
    );

  //For name or text error
  const formatedHelper = (field) =>
    getIn(touched, formatedName(field)) && getIn(errors, formatedName(field));

  return (
    <>
      <Box
        display="grid"
        gap="10px"
        gridTemplateColumns="repeat(4, minmax(0. 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          label="First Name"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName}
          name={formatedName("firstName")}
          error={formatedError("firstName")}
          helperText={formatedHelper("firstName")}
          sx={{ gridColumn: "1fr" }}
        />

        <TextField
          label="Last Name"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastName}
          name={formatedName("lastName")}
          error={formatedError("lastName")}
          helperText={formatedHelper("lastName")}
          sx={{ gridColumn: "1fr" }}
        />

        <TextField
          label="Country"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.country}
          name={formatedName("country")}
          error={formatedError("country")}
          helperText={formatedHelper("country")}
          sx={{ gridColumn: "span 2" }}
        />

        <TextField
          label="Street 1"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.street1}
          name={formatedName("street1")}
          error={formatedError("street1")}
          helperText={formatedHelper("street1")}
          sx={{ gridColumn: "1fr" }}
        />

        <TextField
          label="Street2 (Optional)"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastName}
          name={formatedName("street2")}
          error={formatedError("street2")}
          helperText={formatedHelper("street2")}
          sx={{ gridColumn: "1fr" }}
        />

        <TextField
          label="City Name"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.city}
          name={formatedName("city")}
          error={formatedError("city")}
          helperText={formatedHelper("city")}
          sx={{ gridColumn: "1fr" }}
        />

        <TextField
          label="State"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.state}
          name={formatedName("state")}
          error={formatedError("state")}
          helperText={formatedHelper("state")}
          sx={{ gridColumn: "1fr" }}
        />

        <TextField
          label="Zip Code"
          fullWidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.zipCode}
          name={formatedName("zipCode")}
          error={formatedError("zipCode")}
          helperText={formatedHelper("zipCode")}
          sx={{ gridColumn: "span 2" }}
        />
      </Box>
    </>
  );
};

export default AddressForm;
