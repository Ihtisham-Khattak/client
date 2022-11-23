import React from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { Box, Badge, IconButton } from "@mui/material";
import { theme } from "../../themes";
import {
  PersonOutlined,
  ShoppingBagOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@mui/icons-material";

const Nabar = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const icons = { PersonOutlined,
    ShoppingBagOutlined,
    SearchOutlined,
    MenuOutlined,}

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="60px"
        backgroundColor="rgba(255, 255, 255, 0.95)"
        position="fixed"
        top="0"
        left="0"
        zIndex="1"
        color="black"
      >
        <Box
          width="80%"
          margin="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            onClick={() => navigate("/")}
            sx={{ "&:hover": { cursor: "pointer" } }}
            //   color={shades.secondary[500]}
          >
            JAutos
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            zIndex="2"
            columnGap="20px"
          >
            <IconButton sx={{ color: "black" }}>
              <SearchOutlined />
            </IconButton>

            <IconButton sx={{ color: "black" }}>
              <PersonOutlined />
            </IconButton>

            <IconButton sx={{ color: "black" }}>
              <ShoppingBagOutlined />
            </IconButton>

            <IconButton sx={{ color: "black" }}>
              <MenuOutlined />
            </IconButton>

          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Nabar;
