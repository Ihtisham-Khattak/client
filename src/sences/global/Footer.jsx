import React from "react";
import { useTheme } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { shades } from "../../themes";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <>
      <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
        <Box
          width="80%"
          margin="auto"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          rowGap="30px"
          columnGap="clamp(20px, 30px, 40px)"
        >
          <Box columnGap="20px, 25px, 30px">
            <Typography
              variant="h3"
              fontWeight="bold"
              mb="30px"
              color={shades.secondary[400]}
            >
              JAutos
            </Typography>
            <div style={{width:"20rem", textAlign:"left"}}>
              Lee Collins, am writing on behalf of Green Farm Organics regarding
              our company's entry into a new market in Seattle, Washington. I am
              writing to introduce our company to you and provide some
              information about the organic and natural foods, supplements and
              additional wellness products we provide. We are currently
              operating in markets located in California, Oregon and Colorado
              and are excited to be expanding our reach to the Seattle area.
            </div>
          </Box>

          {/* About Section */}
          <Box>
            <Typography variant="h3" fontWeight="bold" mb="30px">
              About us
            </Typography>
            <Typography mb="30px">Career</Typography>
            <Typography mb="30px">Our Store</Typography>
            <Typography mb="30px">Term & Conditions</Typography>
            <Typography mb="30px">Privacy Policy</Typography>
          </Box>

          {/* Customer Section */}
          <Box>
            <Typography variant="h3" fontWeight="bold" mb="30px">Customer</Typography>
            <Typography mb="30px" >Help Center</Typography>
            <Typography mb="30px" >Track Your Order`</Typography>
            <Typography mb="30px" >Corporate & Bulk Purchase</Typography>
            <Typography mb="30px" >Returns & Refunds</Typography>
          </Box>

          {/* Contact Us */}
          <Box>
            <Typography variant="h3" fontWeight="bold" mb="30px">Contact Us</Typography>
            <Typography mb="30px" >BRT Station 1, Chamkani Peshawar, Pakistan</Typography>
            <Typography mb="30px" >Contact: +92336-9210-134</Typography>
            <Typography mb="30px" >Contact: +92343-5849-824</Typography>
            <Typography mb="30px" >Trusted & Guranteed</Typography>
          </Box>
        </Box>
      </Box>
      <Box>
      <Typography fontWeight="bold" fontSize="15px" textAlign="left" >Ihtisham Khattak</Typography>
      </Box>
    </>
  );
};

export default Footer;
