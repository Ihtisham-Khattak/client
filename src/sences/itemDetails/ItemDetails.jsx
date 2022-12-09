import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, Tabs, Tab } from "@mui/material";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../themes";
import { addToCart, decreaseCount } from "../../state/Slicer";
import { useParams } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ItemsList from "../../components/ItemsList";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  //Item refer to strapi getting item
  const [item, setItem] = useState(null);
  //Related product section
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //New Product
  async function getItem() {
    const item = await fetch(
      `http://localhost:1337/api/items/${itemId}?populate=image`,
      { method: "Get" }
    );
    const ItemJson = await item.json();
    setItem(ItemJson.data);
  }

  //Related Items
  async function getItems() {
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "Get" }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]);
  return (
    <>
      <Box width="80%" m="80px auto">
        <Box display="flex" flexWrap="wrap" columnGap="40px">
          {/* Images */}
          <Box flex="1 1 40%" mb="40px">
            <img
              alt={item?.name}
              width="100%"
              height="100%"
              src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* Actions */}
          <Box flex="1 1 50%" mb="40px" textAlign="left">
            {/* Navigate */}
            <Box display="flex" justifyContent="space-between">
              <Box>Home/Items</Box>
              <Box>Next/Prev</Box>
            </Box>

            {/* Product Descriptions */}
            <Box m="65px 0 25px 0">
              <Typography variant="h3" fontWeight="bold">
                {item?.attributes?.name}
              </Typography>
              <Typography>{item?.attributes?.price}</Typography>
              <Typography sx={{ mt: "20px" }}>
                {item?.attributes?.longDescription}
              </Typography>
            </Box>

            {/* Add/Remove Items */}
            <Box display="flex" alignItems="center" minHeight="50px">
              <Box
                display="flex"
                alignItems="center"
                border={`1.5px solid ${shades.neutral[300]}`}
                mr="20px"
                p="2px 5px"
              >
                {/* Remoce button */}
                <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                  <RemoveIcon />
                </IconButton>
                {/* Count items */}
                <Typography color={shades.primary[300]}>{count}</Typography>
                {/* Add button */}
                <IconButton onClick={() => setCount(count + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>
              {/* Add to cart button */}
              <Button
                sx={{
                  color: "white",
                  backgroundColor: "#222222",
                  borderRadius: "0",
                  minWidth: "150px",
                  padding: "10px 40px",
                }}
                onClick={() =>
                  dispatch(addToCart({ item: { ...item, count } }))
                }
              >
                Add to Cart
              </Button>
            </Box>

            {/* Favorite Items */}
            <Box>
              <Box m="20px 0 5px 0">
                <Typography sx={{ ml: "5px" }}>
                  {" "}
                  <FavoriteBorderOutlinedIcon /> Add to Wishlist
                </Typography>
              </Box>
              <Typography>Categories: {item?.attributes?.category}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Informations */}
        <Box m="20px 0">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Description" value="description" />
            <Tab label="Review" value="reviews" />
          </Tabs>
        </Box>
        <Box dispaly="flex" flexWrap="wrap" gap="15px">
          {value === "description" && (
            <div>{item?.attributes?.longDescription}</div>
          )}
          {value === "reviews" && <div>reviews</div>}
        </Box>

        {/* Related Items */}
        <Box mt="50px" width="100%">
          <Typography varient="h3" fontWeight="bold">
            Related Items
          </Typography>
          <Box
            mt="20px"
            display="flex"
            flexWrap="wrap"
            columnGap="1.33%"
            justifyContent="space-between"
          >
            {/* Images API items */}
            {items.slice(0, 4).map((item) => (
              <ItemsList item={item} key={`${item.name} - ${item.id}`} />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ItemDetails;
