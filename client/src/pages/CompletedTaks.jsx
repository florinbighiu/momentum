import { TasksList } from "../components/TasksList";
import { TbCheck } from "react-icons/tb";

export function CompletedTasks() {
    return <TasksList icon={<TbCheck />} name="Completed" filter={t => t.completed} />;
}
