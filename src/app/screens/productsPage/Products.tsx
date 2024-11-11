import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Margin } from "@mui/icons-material";
import SearchBar from "../../components/searchBar/searchBar";
import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  });

  /* HANDLERS */
  const searchCollecctionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };
  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };
  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className={"top-text"}>
              <p>Burak Restaurant</p>
            </Stack>
            <div className={"search"}>
              <SearchBar />
            </div>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"category-product"}>
              <Stack className={"product-category"}>
                <div className={"category-main"}>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollecctionHandler(ProductCollection.OTHER)
                    }
                  >
                    Other
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.DESSERT
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollecctionHandler(ProductCollection.DESSERT)
                    }
                    className={"order"}
                  >
                    Dessert
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.DRINK
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollecctionHandler(ProductCollection.DRINK)
                    }
                    className={"order"}
                  >
                    Drink
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection ===
                      ProductCollection.SALAD
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollecctionHandler(ProductCollection.SALAD)
                    }
                    className={"order"}
                  >
                    Salad
                  </Button>
                  <Button
                    variant={"contained"}
                    color={
                      productSearch.productCollection === ProductCollection.DISH
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() =>
                      searchCollecctionHandler(ProductCollection.DISH)
                    }
                    className={"order"}
                  >
                    Dish
                  </Button>
                </div>
              </Stack>

              <Stack className={"product-wrapper"}>
                {products.length !== 0 ? (
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + "litre"
                        : product.productSize + "size";
                    return (
                      <Stack
                        key={product._id}
                        className={"product-card"}
                        onClick={() => chooseDishHandler(product._id)}
                      >
                        <Stack
                          className={"product-img"}
                          sx={{ backgroundImage: `url(${imagePath})` }}
                        >
                          <div className={"product-sale"}>{sizeVolume}</div>
                          <Button className={"shop-btn"}>
                            <img
                              src={"/icons/shopping-cart.svg"}
                              style={{ display: "flex" }}
                            />
                          </Button>
                          <Button className={"view-btn"} sx={{ right: "36px" }}>
                            <Badge
                              badgeContent={product.productViews}
                              color="secondary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  color:
                                    product.productViews === 0
                                      ? "gray"
                                      : "white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                        <Box className={"product-desc"}>
                          <span className={"product-title"}>
                            {product.productName}
                          </span>
                          <div className={"product-price"}>
                            <MonetizationOnIcon sx={{ color: "" }} />
                            {product.productPrice}
                          </div>
                        </Box>
                      </Stack>
                    );
                  })
                ) : (
                  <Box className={"no-data"}>Products are not available</Box>
                )}
              </Stack>
            </Stack>

            <Stack className={"pagination-section"}>
              <Pagination
                count={
                  products.length !== 0
                    ? productSearch.page + 1
                    : productSearch.page
                }
                page={productSearch.page}
                renderItem={(item) => (
                  <PaginationItem
                    components={{
                      previous: ArrowBackIcon,
                      next: ArrowForwardIcon,
                    }}
                    {...item}
                    color={"secondary"}
                  />
                )}
                onChange={paginationHandler}
              />
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-section"}>
        <Box sx={{ marginY: "50px", textAlign: "center" }}>
          <h1>Our Family Brands</h1>
          <Stack
            className="brand-box"
            direction="row"
            spacing={3}
            justifyContent="center"
          >
            <img className="brand-img" src="/img/doner.webp" alt="Brand 1" />
            <img className="brand-img" src="/img/gurme.webp" alt="Brand 2" />
            <img className="brand-img" src="/img/seafood.webp" alt="Brand 3" />
            <img className="brand-img" src="/img/sweets.webp" alt="Brand 3" />
          </Stack>
        </Box>
      </div>

      <div className={"address"}>
        <Container className={"address-container"}>
          <Stack className={"address-area"}>
            <h1 className={"address-title"}>Our address</h1>
            <iframe
              className={"address-map"}
              src="https://www.google.com/maps?q=48.86511,2.37457&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
