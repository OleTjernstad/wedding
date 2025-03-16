"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface OverviewProps {
  data: {
    name: string;
    available: number;
    reserved: number;
  }[];
}

export function Overview({ data }: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="available"
          name="Tilgjengelig"
          fill="#adfa1d"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="reserved"
          name="Reservert"
          fill="#2563eb"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
