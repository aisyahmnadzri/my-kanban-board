import { useState } from "react";
import type { Task } from "../types";

interface Props {
  task: Task;
  moveTask: (taskId: string, newCategory: Task["category"]) => void;
  updateTask: (taskId: string, patch: Partial<Task>) => void;
  removeTask: (taskId: string) => void;
}

const categories: Task["category"][] = ["Pending","In Progress","On Hold","Review","Completed"];

const TaskItem = ({ task, moveTask, updateTask, removeTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(task.note || "");
  const [url, setUrl] = useState(task.url || "");

  const saveChanges = () => {
    updateTask(task.id, { note, url });
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <strong>{task.title}</strong>
        <span className="deadline">📅 {new Date(task.deadline).toLocaleDateString()}</span>
      </div>

      {!isEditing ? (
        <>
          {task.note && <p className="note">📝 {task.note}</p>}
          {task.url && <p className="link">🔗 <a href={task.url} target="_blank" rel="noreferrer">{task.url}</a></p>}
        </>
      ) : (
        <div className="edit-section">
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note" />
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Optional URL" />
          <button onClick={saveChanges}>💾 Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}

      <div className="task-actions">
        <select onChange={(e) => moveTask(task.id, e.target.value as Task["category"])} value={task.category}>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
        <button onClick={() => removeTask(task.id)}>🗑 Remove</button>
      </div>
    </div>
  );
};

export default TaskItem;
