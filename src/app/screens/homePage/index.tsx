import React, { useEffect } from "react";
import { Container } from "@mui/material";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR */

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);
  // Selector: Store => Data

  useEffect(() => {
    // Backend server data request => Data

    const result = [
      {
        _id: "66fc0a871bf1f913277269c5",
        productStatus: "PROCESS",
        productCollection: "DISH",
        productName: "Steak",
        productPrice: 20,
        productLeftCount: 2,
        productSize: "NORMAL",
        productVolume: 1,
        productDesc: "It's delicious",
        productImages: [
          "uploads/products/e2c3881e-532b-41fe-ad5f-3be07bf7f968.jpg",
        ],
        productViews: 0,
        createdAt: "2024-10-01T14:43:19.641Z",
        updatedAt: "2024-10-02T02:05:22.207Z",
        __v: 0,
      },
      {
        _id: "66fca3847a8fb554c2ae99d2",
        productStatus: "PAUSE",
        productCollection: "DISH",
        productName: "Kabob",
        productPrice: 30,
        productLeftCount: 50,
        productSize: "SMALL",
        productVolume: 1,
        productDesc: "It's delicious",
        productImages: [
          "uploads/products/a52b2113-b67c-4486-b057-d364e0c13fd0.jpg",
        ],
        productViews: 0,
        createdAt: "2024-10-02T01:36:04.370Z",
        updatedAt: "2024-10-02T01:36:04.370Z",
        __v: 0,
      },
    ];

    // Slice: Data => Store
    // @ts-ignore
    setPopularDishes(result);
  }, []);

  console.log("popularDishes:", popularDishes);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
