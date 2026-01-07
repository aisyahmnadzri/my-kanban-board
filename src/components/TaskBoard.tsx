import { useState } from "react";
import TaskColumn from "./TaskColumn";
import AddTaskForm from "./AddTaskForm";

export interface Task {
  title: string;
  category: "Pending" | "In Progress" | "On Hold" | "Review" | "Completed";
  deadline: string;
  note?: string;
  url?: string;
}

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };
  const moveTask = (index: number, newCategory: Task["category"]) => {
    const updated = [...tasks];
    updated[index].category = newCategory;
    setTasks(updated);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <AddTaskForm addTask={addTask} />
      <TaskColumn
        title="Pending"
        tasks={tasks}
        moveTask={moveTask}
        removeTask={removeTask}
      />
      <TaskColumn
      title="In Progress"
        tasks={tasks}
        moveTask={moveTask}
        removeTask={removeTask}
      />
      <TaskColumn
        title="Completed"
        tasks={tasks}
        moveTask={moveTask}
        removeTask={removeTask}
      />
    </div>
  );
};

export default TaskBoard;

