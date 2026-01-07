import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface Props {
  title: Task["category"];
  tasks: Task[];
  moveTask: (taskId: string, newCategory: Task["category"]) => void;
  updateTask: (taskId: string, patch: Partial<Task>) => void;
  removeTask: (taskId: string) => void;
}

const TaskColumn = ({ title, tasks, moveTask, updateTask, removeTask }: Props) => {
  const filtered = tasks.filter((t) => t.category === title);

  const colorMap: Record<Task["category"], string> = {
    Pending: "#fef3c7",
    "In Progress": "#dbeafe",
    "On Hold": "#fde68a",
    Review: "#e9d5ff",
    Completed: "#dcfce7",
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "0.75rem",
        background: colorMap[title],
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {filtered.length === 0 && (
        <div style={{ color: "#666", fontStyle: "italic" }}>No tasks</div>
      )}
      {filtered.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          moveTask={moveTask}
          updateTask={updateTask}
          removeTask={removeTask}
        />
      ))}
    </div>
  );
};

export default TaskColumn;

