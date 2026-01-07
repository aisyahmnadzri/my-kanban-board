import { useEffect, useState } from "react";
import type { Project, Task } from "./types";
import ProjectSelector from "./components/ProjectSelector";
import ProjectBoard from "./components/ProjectBoard";

const STORAGE_KEY = "kanban_projects_v1";

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Project[];
        setProjects(parsed);
        if (parsed.length > 0) setActiveProjectId(parsed[0].id);
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Omit<Project, "id">) => {
    const newProject: Project = { id: crypto.randomUUID(), ...project };
    setProjects((prev) => [...prev, newProject]);
    setActiveProjectId(newProject.id);
  };

  const updateProjectTasks = (projectId: string, tasks: Task[]) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, tasks } : p))
    );
  };

  const activeProject = projects.find((p) => p.id === activeProjectId) || null;

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>📊 Project Kanban Board</h1>

      <ProjectSelector
        projects={projects}
        activeProjectId={activeProjectId}
        setActiveProjectId={setActiveProjectId}
        addProject={addProject}
      />

      {activeProject && (
        <ProjectBoard
          project={activeProject}
          updateProjectTasks={(tasks) =>
            updateProjectTasks(activeProject.id, tasks)
          }
        />
      )}
    </div>
  );
}

export default App;

