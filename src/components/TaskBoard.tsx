import { useState } from "react";
import type { Task } from "../types";

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // 🔹 Move a task to a new category
  const moveTask = (taskId: string, category: Task["category"]) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, category } : t
      )
    );
  };

  // 🔹 Delete a task
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem" }}>
        {["Pending", "In Progress", "On Hold", "Review", "Completed"].map(
          (cat) => (
            <div
              key={cat}
              style={{ flex: 1, border: "1px solid #ddd", padding: "1rem" }}
            >
              <h3>{cat}</h3>
              {tasks
                .filter((t) => t.category === cat)
                .map((t) => (
                  <div
                    key={t.id}
                    style={{
                      background: "#fff",
                      marginBottom: "0.5rem",
                      padding: "0.5rem",
                      borderRadius: "6px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div>{t.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>
                      Deadline: {t.deadline}
                    </div>
                    <button onClick={() => deleteTask(t.id)}>Delete</button>
                    <button onClick={() => moveTask(t.id, "Completed")}>
                      Mark Completed
                    </button>
                  </div>
                ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TaskBoard;