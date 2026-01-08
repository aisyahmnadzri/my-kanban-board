import type { Project, Task } from "../types";
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import type{ DropResult } from "react-beautiful-dnd";
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
  // Handle drag end
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // Ignore if dropped in same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update task category based on destination column
    updateProjectTasks(
      project.tasks.map((t) =>
        t.id === draggableId
          ? { ...t, category: destination.droppableId as Task["category"] }
          : t
      )
    );
  };

  // Add new task
  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = { id: crypto.randomUUID(), ...task };
    updateProjectTasks([...project.tasks, newTask]);
  };

  return (
    <div className="project-board">
      <header className="project-header">
        <h2>{project.name}</h2>
        <span className="project-dates">
          {new Date(project.startDate).toLocaleDateString()} →{" "}
          {new Date(project.endDate).toLocaleDateString()}
        </span>
      </header>

      <AddTaskForm addTask={addTask} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns-grid">
          {categories.map((cat) => (
            <Droppable droppableId={cat} key={cat}>
              {(provided, snapshot) => (
                <div
                  className={`column-card ${
                    snapshot.isDraggingOver ? "dragging-over" : ""
                  }`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>
                    {cat} (
                    {project.tasks.filter((t) => t.category === cat).length})
                  </h3>

                  {project.tasks
                    .filter((t) => t.category === cat)
                    .map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >
                        {(provided) => (
                          <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <strong>{task.title}</strong>
                            <div className="deadline">
                              📅{" "}
                              {new Date(task.deadline).toLocaleDateString()}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <GanttChart tasks={project.tasks} />
    </div>
  );
};

export default ProjectBoard;