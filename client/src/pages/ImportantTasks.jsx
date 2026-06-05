import { TasksList } from "../components/TasksList";
import { TbStar } from "react-icons/tb";

export function ImportantTasks() {
    return <TasksList icon={<TbStar />} name="Important" filter={t => t.important && !t.completed} />;
}
