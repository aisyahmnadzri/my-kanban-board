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
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    if (!name || !startDate || !endDate) return;
    addProject({ name, startDate, endDate, tasks: [] });
    setName("");
    setStartDate("");
    setEndDate("");
    setShowModal(false); // close modal after adding
  };

  return (
    <div className="project-selector">
      <div>
        <label>Choose Project</label>
        <select
          value={activeProjectId || ""}
          onChange={(e) => setActiveProjectId(e.target.value || null)}
        >
          <option value="">— Select —</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add Project Button */}
      <button className="add-project-btn" onClick={() => setShowModal(true)}>
        ➕ Add New Project
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Create New Project</h3>
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
            <div className="modal-actions">
              <button onClick={handleAdd}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
