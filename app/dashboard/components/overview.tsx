"use client";

import formatNumber from "@/lib/format-number";
import { log } from "console";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Data = {
  name: string;
  total: number;
};

const data: Data[] = [
  {
    name: "Jan",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "Feb",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "Mar",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "Apr",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "May",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "Jun",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "Jul",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "Aug",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "Sep",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "Oct",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "Nov",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
  {
    name: "Dec",
    total: (Math.floor(Math.random() * 5000) + 1000) * 15000,
  },
];

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ payload: Data }>;
  label?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload: data,
  label,
}) => {
  if (active && data) {
    return (
      <div className="rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
        <div className="mb-2 text-lg">{label}</div>
        <div className="mb-2 flex items-center justify-between">
          <div className="mr-2 text-sm">Pemasukan:</div>
          <div className="text-lg font-bold">
            {data[0].payload.total.toLocaleString()}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export function Overview() {
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
          tickFormatter={(value) => "IDR " + formatNumber(parseInt(value))}
          width={90}
        />
        {/* <Tooltip content={<CustomTooltip />} /> */}
        <Bar dataKey="total" fill="#0085cd" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
