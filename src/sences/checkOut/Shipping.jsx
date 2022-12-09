import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
}) => {
  return (
    <>
      <Box m="30px auto">
        <Box>
          <Typography sx={{ mb: "15px" }} fontSize="18px" fontWeight="bold">
            Billing Information
          </Typography>

          {/* Address form */}
          <AddressForm
            type="billingAddress"
            values={values.billingAddress}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </Box>

        {/* Shipping form */}
        <Box mb="20px" display="flex" >
          <FormControlLabel
            label="Same for Shipping Address"
            control={
              <Checkbox
                defaultChecked
                value={values.shippingAddress.isSameAddress}
                onChange={() => {
                  setFieldValue(
                    "shippingAddress.isSameAddress",
                    !values.shippingAddress.isSameAddress
                  );
                }}
              />
            }
          />
        </Box>

      {/* Shipping form */}
      {
        !values.shippingAddress.isSameAddress && (

          <Box>
             <Typography sx={{ mb: "15px" }} fontSize="18px" fontWeight="bold">
            Shipping Information
          </Typography>

          {/* Address form */}
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          </Box>
        )
      }
      </Box>
    </>
  );
};

export default Shipping;
