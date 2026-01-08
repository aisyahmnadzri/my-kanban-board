import { useState } from "react";
import type { Task } from "../types";

interface Props {
  addTask: (task: Omit<Task, "id">) => void;
}

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
    <form className="form-card" onSubmit={(e) => { e.preventDefault(); handleAdd(); }}>
      <label>
        Task Name
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task name" />
      </label>
      <label>
        Deadline
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </label>
      <button type="submit">➕ Add Task</button>
    </form>
  );
};

export default AddTaskForm;


