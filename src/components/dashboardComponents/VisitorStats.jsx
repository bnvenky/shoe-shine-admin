/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Card, Typography, Progress, } from "antd";
import { getComments } from "../../API";
import 'tailwindcss/tailwind.css';

function VisitorStats() {
  const [growth, setGrowth] = useState(0);
  const [sources, setSources] = useState({
    socialMedia: 0,
    affiliate: 0,
    purchased: 0,
    advertisement: 0,
  });

  useEffect(() => {
    getComments().then((res) => {
      setGrowth(97.14);
      setSources({
        socialMedia: 50,
        affiliate: 18,
        purchased: 30,
        advertisement: 20,
      });
    });
  }, []);

  return (
  
    <Card className="w-full bg-white shadow-lg rounded-lg p-6">
      <Typography.Title level={4} className="text-xl font-bold mb-2">Visitors</Typography.Title>
      <Typography.Text className="text-gray-600">Recent month</Typography.Text>
      <div className="flex justify-center items-center my-4">
        <Progress type="dashboard" percent={growth} className="text-2xl font-semibold"/>
      </div>
      <Typography.Text className="text-center text-gray-600">
        <ul className="list-none mt-2 space-y-1">
          <li className="flex justify-between">
            <span>Social media</span>
            <span>{sources.socialMedia}%</span>
          </li>
          <li className="flex justify-between">
            <span>Affiliate visitors</span>
            <span>{sources.affiliate}%</span>
          </li>
          <li className="flex justify-between">
            <span>Purchased visitors</span>
            <span>{sources.purchased}%</span>
          </li>
          <li className="flex justify-between">
            <span>By advertisement</span>
            <span>{sources.advertisement}%</span>
          </li>
        </ul>
      </Typography.Text>
    </Card>
    
  );
}

export default VisitorStats;


