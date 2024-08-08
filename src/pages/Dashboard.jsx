/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Typography, Row, Col } from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getCustomers, getInventory, getOrders } from "../API";
import DashboardCard from "../components/dashboardComponents/DashboardCard";
import RecentOrders from "../components/dashboardComponents/RecentOrders";
import DashboardChart from "../components/dashboardComponents/DashboardChart";
import VisitorStats from "../components/dashboardComponents/VisitorStats";
import { Box } from "@mui/material";

function Dashboard() {
  const [orders, setOrders] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res.total);
      setRevenue(res.discountedTotal);
    });
    getInventory().then((res) => {
      setInventory(res.total);
    });
    getCustomers().then((res) => {
      setCustomers(res.total);
    });
  }, []);

  return (
    <Box  className="p-4 bg-gray-100">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Total Orders"}
            value={orders}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Total Inventory"}
            value={inventory}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Total Customer"}
            value={customers}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Total Revenue"}
            value={revenue}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
      <Col xs={24} md={16} style={{ marginTop: 16 }}>
      <DashboardChart />
      </Col>
      <Col xs={24} md={8} style={{ marginTop: 16 }}>
      <VisitorStats />
      </Col>
      </Row>
      
      <RecentOrders />
      
    </Box>
  );
}

export default Dashboard;