import type { Project, Task } from "../types";
import TaskColumn from "./TaskColumn";
import AddTaskForm from "./AddTaskForm";
import GanttChart from "./GanttChart";

interface Props {
  project: Project;
  updateProjectTasks: (tasks: Task[]) => void;
}

const categories: Task["category"][] = [
  "Pending",
  "In Progress",
  "On Hold",
  "Review",
  "Completed",
];

const ProjectBoard = ({ project, updateProjectTasks }: Props) => {
  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = { id: crypto.randomUUID(), ...task };
    updateProjectTasks([...project.tasks, newTask]);
  };

  const moveTask = (taskId: string, newCategory: Task["category"]) => {
    const updated = project.tasks.map((t) =>
      t.id === taskId ? { ...t, category: newCategory } : t
    );
    updateProjectTasks(updated);
  };

  const updateTask = (taskId: string, patch: Partial<Task>) => {
    const updated = project.tasks.map((t) =>
      t.id === taskId ? { ...t, ...patch } : t
    );
    updateProjectTasks(updated);
  };

  const removeTask = (taskId: string) => {
    const updated = project.tasks.filter((t) => t.id !== taskId);
    updateProjectTasks(updated);
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "1rem",
          padding: "0.75rem",
          border: "1px solid #eee",
          borderRadius: "8px",
          background: "#fafafa",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
          {project.name} — {project.startDate} → {project.endDate}
        </div>
        <AddTaskForm addTask={addTask} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
        {categories.map((cat) => (
          <TaskColumn
            key={cat}
            title={cat}
            tasks={project.tasks}
            moveTask={moveTask}
            updateTask={updateTask}
            removeTask={removeTask}
          />
        ))}
      </div>
      <GanttChart tasks={project.tasks} />
    </div>
  );
};

export default ProjectBoard;

