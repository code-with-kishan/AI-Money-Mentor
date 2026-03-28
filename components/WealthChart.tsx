"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { month: "Jan", wealth: 220000 },
  { month: "Feb", wealth: 238000 },
  { month: "Mar", wealth: 260000 },
  { month: "Apr", wealth: 286000 },
  { month: "May", wealth: 309000 },
  { month: "Jun", wealth: 340000 },
];

export default function WealthChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id="wealth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5a8cff" stopOpacity={0.72} />
            <stop offset="95%" stopColor="#5a8cff" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(170, 210, 255, 0.14)" />
        <XAxis dataKey="month" stroke="#b3c8ff" />
        <YAxis stroke="#b3c8ff" />
        <Tooltip
          contentStyle={{
            background: "rgba(9, 17, 33, 0.95)",
            border: "1px solid rgba(130,180,255,0.35)",
            borderRadius: "12px",
            color: "#e3ecff",
          }}
        />
        <Area type="monotone" dataKey="wealth" stroke="#5a8cff" fill="url(#wealth)" strokeWidth={2.2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
