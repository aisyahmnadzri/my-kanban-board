import { useState } from "react";
import type { Task } from "../types";

interface Props {
  task: Task;
  moveTask: (taskId: string, newCategory: Task["category"]) => void;
  updateTask: (taskId: string, patch: Partial<Task>) => void;
  removeTask: (taskId: string) => void;
}

const categories: Task["category"][] = [
  "Pending",
  "In Progress",
  "On Hold",
  "Review",
  "Completed",
];

const TaskItem = ({ task, moveTask, updateTask, removeTask }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [note, setNote] = useState(task.note || "");
  const [url, setUrl] = useState(task.url || "");

  const saveChanges = () => {
    updateTask(task.id, { note, url });
    setIsEditing(false);
  };

  return (
    <div
      style={{
        marginBottom: "0.75rem",
        padding: "0.75rem",
        border: "1px solid #bbb",
        borderRadius: "6px",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {/* Task title + deadline */}
      <div style={{ fontWeight: 600, fontSize: "1rem" }}>{task.title}</div>
      <div style={{ fontSize: "0.85rem", color: "#555" }}>
        Deadline: {task.deadline}
      </div>

      {/* Notes + URL */}
      {!isEditing ? (
        <>
          {task.note && (
            <div style={{ marginTop: "0.25rem", fontSize: "0.9rem" }}>
              📝 {task.note}
            </div>
          )}
          {task.url && (
            <div style={{ marginTop: "0.25rem", fontSize: "0.9rem" }}>
              🔗{" "}
              <a href={task.url} target="_blank" rel="noreferrer">
                {task.url}
              </a>
            </div>
          )}
        </>
      ) : (
        <div style={{ marginTop: "0.5rem" }}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note/comment"
            rows={3}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Optional URL"
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <button onClick={saveChanges} style={{ marginRight: "0.5rem" }}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}

      {/* Action buttons */}
      <div
        style={{
          marginTop: "0.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => moveTask(task.id, cat)}
            style={{ fontSize: "0.8rem" }}
          >
            Move to {cat}
          </button>
        ))}
        <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
        <button onClick={() => removeTask(task.id)}>❌ Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;

