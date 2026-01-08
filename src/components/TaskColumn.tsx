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

  return (
    <div className="column-card">
      <h3>{title} ({filtered.length})</h3>
      {filtered.length === 0 ? (
        <p className="empty">No tasks</p>
      ) : (
        filtered.map((task) => (
          <TaskItem key={task.id} task={task} moveTask={moveTask} updateTask={updateTask} removeTask={removeTask} />
        ))
      )}
    </div>
  );
};

export default TaskColumn;
