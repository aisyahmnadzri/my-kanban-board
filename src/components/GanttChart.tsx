import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Task } from "../types";

interface Props {
  tasks: Task[];
}

const GanttChart = ({ tasks }: Props) => {
  const data = tasks.map((t) => ({
    name: t.title,
    deadline: new Date(t.deadline).getTime(),
    category: t.category,
  }));

  return (
    <div className="gantt-chart">
      <h2>📅 Timeline</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis
            type="number"
            domain={["auto", "auto"]}
            tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
          />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip
            labelFormatter={(label) => `Task: ${label}`}
            formatter={(value) => new Date(Number(value)).toLocaleDateString()}
          />
          <Bar dataKey="deadline" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GanttChart;
