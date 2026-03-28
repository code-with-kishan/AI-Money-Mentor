"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface BaseBarChartProps {
  data: any[];
  bars: Array<{ key: string; name: string; color: string }>;
  height?: number;
  xAxisKey?: string;
  yAxisFormatter?: (value: any) => string;
}

export const BaseBarChart = React.memo(function BaseBarChart({
  data,
  bars,
  height = 300,
  xAxisKey = "name",
  yAxisFormatter = (v) => `${v}`,
}: BaseBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey={xAxisKey} stroke="#94a3b8" fontSize={12} />
        <YAxis 
          stroke="#94a3b8" 
          fontSize={12} 
          tickFormatter={yAxisFormatter} 
        />
        <Tooltip
          formatter={(value: any) => `₹${Number(value).toLocaleString("en-IN")}`}
          contentStyle={{
            backgroundColor: "rgba(10, 17, 33, 0.95)",
            border: "1px solid rgba(165, 183, 227, 0.26)",
            borderRadius: "0.75rem",
          }}
        />
        <Legend 
           verticalAlign="bottom" 
           height={36} 
           iconType="square"
           wrapperStyle={{ paddingTop: "20px", fontSize: "12px", color: "#94a3b8" }}
        />
        {bars.map((bar) => (
          <Bar key={bar.key} dataKey={bar.key} name={bar.name} fill={bar.color} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
});
