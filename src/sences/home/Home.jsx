import { CircularProgress } from "@mui/material";
import React from "react";
import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";

const Home = () => {
  return (
    <div className="home">
      <CircularProgress />
      <MainCarousel />
      <ShoppingList />
    </div>
  );
};

export default Home;
