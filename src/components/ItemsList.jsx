import React, { useState } from "react";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../themes";
import { addToCart, decreaseCount } from "../state/Slicer";
import { useNavigate } from "react-router-dom";

// item and width object comes from backend

const ItemsList = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    palette: { neutral },
  } = useTheme();

 // if (loading) return <h1>Loading...</h1>;
  //From item content-type builders.
  const { category, price, image, name } = item.attributes;

  const {
    data: {
      attributes: {
        formats: {
          thumbnail: { url },
        },
      },
    },
  } = image;
  
  return (
    <>
      <Box width={width} onClick={() => setLoading(true)}>
        <Box
          position="relative"
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        >
          <img
            alt={item?.name}
            width="300px"
            height="300px"
            src={`http://localhost:1337${url}`}
            // Lead us to item detail  page.
            onClick={() => navigate(`/item/${item.id}`)}
          />

          <Box
            display={hovered ? "block" : "none"}
            position="absolute"
            bottom="10%"
            left="0"
            padding="0 5%"
            width="100%"
          >
            <Box display="flex" justifyContent="space-between">
              {/* Amount Section */}
              <Box
                display="flex"
                alignItems="center"
                backgroundColor={shades.neutral[500]}
                borderRadius="3px"
              >
                {/* Add and Remove Items */}
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography color={shades.primary[300]}>{count}</Typography>
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>

              {/*  Button */}
              <Button
                onClick={() => {
                  // Get the item object with total count
                  dispatch(addToCart({ item: { ...item, count } }));
                }}
                sx={{ backgroundColor: shades.primary[300], color: "white" }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
        {/* Product Details*/}
        <Box mt="3px">
          <Typography variant="subtitle3" color={shades.dark}>
            {category
              .replace(/[A-Z]/g, "$1")
              .replace(/^./, (str) => str.toUpperCase())}
          </Typography>
          <Typography>{name}</Typography>
          <Typography fontWeight="bold">${price}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ItemsList;
