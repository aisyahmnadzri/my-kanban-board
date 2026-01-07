import { useState } from "react";
import type { Task } from "../types";

interface Props {
  addTask: (task: Omit<Task, "id">) => void;
}

const categories: Task["category"][] = [
  "Pending",
  "In Progress",
  "On Hold",
  "Review",
  "Completed",
];

const AddTaskForm = ({ addTask }: Props) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState<Task["category"]>("Pending");

  const handleAdd = () => {
    if (!title || !deadline) return;
    addTask({ title, deadline, category });
    setTitle("");
    setDeadline("");
    setCategory("Pending");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: "0.5rem" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;

