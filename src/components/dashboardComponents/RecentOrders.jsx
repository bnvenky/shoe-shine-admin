import { useEffect, useState } from "react";
import { Col, Row, Table, Typography } from "antd";
import { getOrders } from "../../API";

function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 5));
      setLoading(false);
    });
  }, []);

  return (
    <Row gutter={[16, 16]}>
    <Col xs={24}>
          
        
    <div className="w-full m-2 rounded-lg shadow-lg bg-slate-50 p-3">
      <Typography.Title level={4}>Recent Orders</Typography.Title>
      <Table
        columns={[
          { title: "Title", dataIndex: "title" },
          { title: "Quantity", dataIndex: "quantity" },
          { title: "Price", dataIndex: "discountedPrice" },
          { title: "Status", dataIndex: "status" },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
    </Col>
    </Row>
  );
}

export default RecentOrders;

