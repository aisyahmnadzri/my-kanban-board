import { useState } from "react";
import type { Project } from "../types";

interface Props {
  projects: Project[];
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
  addProject: (project: Omit<Project, "id">) => void;
}

const ProjectSelector = ({
  projects,
  activeProjectId,
  setActiveProjectId,
  addProject,
}: Props) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAdd = () => {
    if (!name || !startDate || !endDate) return;
    addProject({ name, startDate, endDate, tasks: [] });
    setName("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        marginBottom: "1.5rem",
      }}
    >
      <div>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Select project
        </label>
        <select
          value={activeProjectId || ""}
          onChange={(e) => setActiveProjectId(e.target.value || null)}
          style={{ width: "100%", padding: "0.5rem" }}
        >
          <option value="">—</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "0.75rem",
          borderRadius: "8px",
        }}
      >
        <div style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
          Add new project
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={handleAdd}
          style={{ marginTop: "0.5rem", padding: "0.5rem 0.75rem" }}
        >
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectSelector;

