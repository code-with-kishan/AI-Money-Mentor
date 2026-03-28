"use client";

import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BaseAreaChartProps {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  height?: number;
  gradientColor?: string;
  strokeColor?: string;
}

export const BaseAreaChart = React.memo(function BaseAreaChart({
  data,
  dataKey,
  xAxisKey = "month",
  height = 250,
  gradientColor = "#5a8cff",
  strokeColor = "#5a8cff",
}: BaseAreaChartProps) {
  const gradientId = `color${dataKey}`;
  
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientColor} stopOpacity={0.7} />
            <stop offset="95%" stopColor={gradientColor} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey={xAxisKey} stroke="#94a3b8" fontSize={12} />
        <YAxis 
           stroke="#94a3b8" 
           fontSize={12} 
           tickFormatter={(v) => `₹${Number(v).toLocaleString("en-IN", { notation: "compact" })}`}
        />
        <Tooltip
          formatter={(value: any) => `₹${Number(value).toLocaleString("en-IN")}`}
          contentStyle={{
            backgroundColor: "rgba(10, 17, 33, 0.95)",
            border: "1px solid rgba(165, 183, 227, 0.26)",
            borderRadius: "0.75rem",
          }}
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={strokeColor}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});
