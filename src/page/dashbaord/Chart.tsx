import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 200 },
  { name: "May", value: 500 },
  { name: "Jun", value: 450 },
  { name: "Jul", value: 700 },
  { name: "Aug", value: 350 },
  { name: "Sep", value: 550 },
  { name: "Oct", value: 650 },
  { name: "Nov", value: 400 },
  { name: "Dec", value: 800 },
];

export default function Chart() {
  return (
    <BarChart width={1300} height={500} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#4867CE" />
    </BarChart>
  );
}
