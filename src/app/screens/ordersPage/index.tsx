import { useState, SyntheticEvent } from "react";
import { Box, Container, Stack } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PauseOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="order tabs"
                  className="table_list"
                >
                  <Tab label="PAUSED ORDERS" value="1" />
                  <Tab label="PROCESS ORDERS" value="2" />
                  <Tab label="FINISHED ORDERS" value="3" />
                </Tabs>
              </Box>
            </Box>

            <TabPanel value="1">
              <PauseOrders />
            </TabPanel>
            <TabPanel value="2">
              <ProcessOrders />
            </TabPanel>
            <TabPanel value="3">
              <FinishedOrders />
            </TabPanel>
          </TabContext>
        </Stack>

        <Stack className="order-right">
          <Box className="order-info-box">
            <Box className="member-box">
              <div className="order-user-img">
                <img
                  src="/img/David.jpg"
                  className="order-user-avatar"
                  alt="User Avatar"
                />
                <div className="order-user-icon-box">
                  <img
                    src="/icons/user-badge.svg"
                    className="order-user-prof-img"
                    alt="User Badge"
                  />
                </div>
              </div>
              <span className="order-user-name">David</span>
              <span className="order-user-role">User</span>
            </Box>

            <Box className="liner"></Box>

            <Box className="order-user-address">
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
                <p className={"spec-address-txt"}>Yeose, South Korea</p>
              </div>
            </Box>
          </Box>

          <Box className="order-info-box">
            <div className={"card-input"}>
              <p className={"card-number"}>Card number: 5243 4090 2002 7495</p>
            </div>
            <Stack className={"card-half-box"}>
              <Box className={"card-half-input"}>
                <p className={"card-valid-period"}>07/24</p>
              </Box>
              <Box className={"card-half-input"}>
                <p className={"card-valid-period"}>CVV : 010</p>
              </Box>
            </Stack>
            <div className={"card-input"}>
              <p className={"card-number"}>David Yuldashev</p>
            </div>
            <Stack className={"cards-box"}>
              <Box>
                {" "}
                <img src={"/img/Western-union.svg"} alt="" />
              </Box>
              <Box>
                {" "}
                <img src={"/img/master-card.svg"} alt="" />
              </Box>
              <Box>
                {" "}
                <img src={"/img/Paypal.svg"} alt="" />
              </Box>
              <Box>
                {" "}
                <img src={"/img/visa-card.svg"} alt="" />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
