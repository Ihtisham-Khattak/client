
//#:#&:##

import React, { useState } from "react";
import { useSelector } from "react-redux";
//Form
import { Formik } from "formik";
//Validation
import * as yup from "yup";
import { shades } from "../../themes";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import Shipping from "./Shipping";
import Payment from "./Payment";

//Form initial value
const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },

  shippingAddress: {
    //Copy billing address if the address remain same
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkOutScheme = [
  //Object() due to billing address in object form

  //Billing Address
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      country: yup.string().required(),
      street1: yup.string().required(),
      street2: yup.string().required(),
      city: yup.string().required(),
      state: yup.string().required(),
      zipCode: yup.string().required(),
    }),
  }),

  //Shipping Address
  yup.object().shape({
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required(),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required(),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),

  //User email and Password
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];



const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  //Function will be trigger when the form is fully submited.
  const handleSubmitForm = async (values, actions) => {
    setActiveStep(activeStep + 1);

    //Copies the billing address to shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(value) {}

  return (
    <>
      {/* Stepper */}
      <Box width="80%" m="100px auto">
        <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
          <Step>
            <StepLabel>Billing</StepLabel>
          </Step>

          <Step>
            <StepLabel>Payment</StepLabel>
          </Step>
        </Stepper>

        {/* Form */}
        <Formik
          onSubmit={handleSubmitForm}
          initialValues={initialValues}
          validationSchema={checkOutScheme[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleChange}>

              {/* Shipping Step */}
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                />
              )}

              {/* Place Order Step */}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  handleSubmit={handleSubmit}
                  setFieldValue={setFieldValue}
                />
              )}

              <Box display="flex" justifyContent="space-between" gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="conatined"
                    sx={{
                      backgroundColor: shades.primary[200],
                      borderRadius: 0,
                      color: "white",
                      boxShadow: "none",
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}

                {/* Next Page Button */}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="conatined"
                  sx={{
                    backgroundColor: shades.primary[200],
                    borderRadius: 0,
                    color: "white",
                    boxShadow: "none",
                    padding: "15px 40px",
                  }}
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  {isFirstStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Checkout;
