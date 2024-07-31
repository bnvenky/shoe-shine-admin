/* eslint-disable react/prop-types */


import { Card, Space, Statistic } from "antd";

function DashboardCard({ title, value, icon }) {
  return (
    <Card className="w-full bg-white shadow-lg rounded-lg p-3" style={{ width: "100%" }}>
      <Space direction="horizontal">
        {icon}
        <Statistic
          title={<div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>}
          value={value}
          style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        />
      </Space>
    </Card>
  );
}

export default DashboardCard;



