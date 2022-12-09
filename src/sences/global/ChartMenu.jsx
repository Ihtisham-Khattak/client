import React from "react";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { shades } from "../../themes";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
//redux state import
import {
  increaseCount,
  decreaseCount,
  removeDuplicate,
  setCartOpen,
} from "../../state/Slicer";
//navigate to main page
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box) ({
    display: "flex",
    justifyConent: "space-between",
    alignItems: "center",

  });

const ChartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  //total item in cart

  const totalItemsPrice = cart.reduce((total, item, index) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <>
      <Box
        //   Parent Div
        //  Screen Overlay
        display={isCartOpen ? "block" : "none"}
        backgroundColor="rgba(0,0,0,0.4)"
        position="fixed"
        width="100%"
        height="100%"
        zIndex={10}
        left="0"
        top="0"
        overflow="auto"
      >
        <Box
          //Cart Model
          position="fixed"
          backgroundColor="#fff"
          right="0"
          bottom="0"
          width="max(400px, 30%)"
          height="100%"
        >
          <Box padding="30px" overflow="auto" height="100%">
            {/* Cart Header */}
            <FlexBox mt="3rem" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h3" color="back">
                SHOPPING BAG ({cart.length})
              </Typography>
              <IconButton onClick={() => dispatch(setCartOpen({}))}>
                <CloseIcon/>
              </IconButton>
            </FlexBox>

            {/* Cart List */}
            <Box>
              {cart.map((items) => (
                <Box key={`${items.attributes.name}-${items.id}`}>
                  {/* 15px = Top & Bottom, 0 = Left & Right */}
                  <FlexBox padding="15px 0">
                    {/* 1 = Flex grow, 1 = Flex shrink 40% = width */}
                    <Box flex="1 1 40%">
                      <img
                        alt={items?.name}
                        width="123px"
                        height="164px"
                        src={`http://localhost:1337/${items?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      />
                    </Box>

                    <Box flex="1 1 40%">
                      {/* Item Name */}
                      <FlexBox mb="5px">
                        <Typography fontWeight="bold">
                          {items?.attributes?.name}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(removeDuplicate({ id: items.id }))
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </FlexBox>
                      {/* Item Descriptions */}
                      <Typography>
                        {items.attributes.shortDescription}
                      </Typography>
                      {/* Amount  */}
                      <FlexBox m="15px 0">
                        <Box
                          display="flex"
                          alignItems="center"
                          border={`1.5px solid ${shades.neutral[500]}`}
                        >
                          {/* Decrement Items */}
                          <IconButton
                            onClick={() =>
                              dispatch(decreaseCount({ id: items.id }))
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          {/* Number of Items */}
                          <Typography>{items.count}</Typography>
                          {/* Increment Items */}
                          <IconButton
                            onClick={() =>
                              dispatch(increaseCount({ id: items.id }))
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>

                        {/* Item Prices */}
                        <Typography fontWeight="bold">{items.price}</Typography>
                      </FlexBox>
                    </Box>
                  </FlexBox>
                  <Divider />
                </Box>
              ))}
            </Box>

            {/* Actions */}
            <Box margin="20px 0">
              <FlexBox margin="20px 0" sx={{ justifyContent: 'space-between' }}>
                <Typography fontWeight="bold">SUBTOTAL</Typography>
                <Typography fontWeight="bold">${totalItemsPrice}</Typography>
              </FlexBox>
              <Button
                sx={{
                  backgroundColor: shades.primary[500],
                  margin: "20px 0",
                  padding: "20px 40px",
                  minWidth: "100%",
                  color: "white",
                  borderRadius: 0,
                  "&.hover": {color: "rgba(0,0,0,0.5)"}
                }}
                onClick={() => {
                  navigate("/checkout");
                  dispatch(setCartOpen({}));
                }}
              >
                CheckOut
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChartMenu;
