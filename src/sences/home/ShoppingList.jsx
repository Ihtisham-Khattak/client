import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../../state/Slicer";
import ItemsList from "../../components/ItemsList";

const ShoppingList = () => {
  const dispatch = useDispatch();
  //state=Parameter, Cart=Name defined in Slicer, Item=Slicer
  const items = useSelector((state) => state.cart.item);
  const [value, setValue] = useState("all");
  const isNonMobile = useMediaQuery("(min-width: 240ps)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    // Use item data from strapi
    const items = await fetch(
      "http://localhost:1337/api/items?populate=image",
      {
        method: "GET",
        contentType: "application/json",
      }
    );

    const itemJSON = await items.json();
    dispatch(setItem(itemJSON.data));
  }

  useEffect(() => {
    getItems();
  }, []);

  //Category Filters
  // 1. Top Category Items
  const topRated = items.filter(
    (item) => item.attributes.category === "topRated"
  );
 
  // 2. New Arrival Items
  const newArrival = items.filter(
    (item) => item.attributes.category === "newArrival"
  );
  // 3. Best Sellers Items
  const bestSeller = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );

  return (
    <Box width="80%" margin="80px auto">
      
          <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      {/* Starting Tabs */}
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{ m: "20px", "& .MuiTabs-flexContainer": { flexWrap: "wrap" } }}
      >
        <Tab label="All" value="all" />
        <Tab label="New Arrival" value="newArrival" />
        <Tab label="Best Seller" value="bestSeller" />
        <Tab label="Top Rated" value="topRated" />
      </Tabs>

      {/* Grid Items */}
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
        textAlign="left"
      >
        {
          //1. For all items
          value === "all" &&
            items.map((item) => (
              <ItemsList item={item} key={`${item.name} - ${item.id}`} />
            ))
        }
        {
          // 2. For new arrival items
          value === "newArrival" &&
            newArrival.map((item) => (
              <ItemsList item={item} key={`${item.name}-${item.id}`} />
            ))
        }{" "}
        {
          //3. For best seller items
          value === "bestSeller" &&
            bestSeller.map((item) => (
              <ItemsList item={item} key={`${item.name}-${item.id}`} />
            ))
        }{" "}
        {
          // 4. For all items
          value === "topRated" &&
            topRated.map((item) => (
              <ItemsList item={item} key={`${item.name}-${item.id}`} />
            ))
        }
      </Box>
    </Box>
  );
};

export default ShoppingList;
