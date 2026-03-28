"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface BasePieChartProps {
  data: Array<{ name: string; value: number }>;
  colors: Record<string, string>;
  height?: number;
  totalValue?: number;
}

export const BasePieChart = React.memo(function BasePieChart({ 
  data, 
  colors, 
  height = 280,
  totalValue 
}: BasePieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={
            totalValue 
              ? ({ name, value }) => `${name}: ${((value / totalValue) * 100).toFixed(0)}%`
              : undefined
          }
          outerRadius={height / 3.5}
          fill="#8884d8"
          dataKey="value"
          stroke="rgba(255,255,255,0.1)"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[entry.name] || "#8884d8"} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: any) => value ? `₹${Number(value).toLocaleString("en-IN")}` : ""}
          contentStyle={{
            backgroundColor: "rgba(10, 17, 33, 0.95)",
            border: "1px solid rgba(165, 183, 227, 0.26)",
            borderRadius: "0.75rem",
            color: "#e2e8f0"
          }}
          itemStyle={{ color: "#e2e8f0" }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          iconType="circle"
          wrapperStyle={{ paddingTop: "20px", fontSize: "12px", color: "#94a3b8" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
});
