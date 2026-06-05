import { TasksList } from "../components/TasksList";
import { TbLayoutGrid } from "react-icons/tb";

export default function AllTasks() {
    return <TasksList icon={<TbLayoutGrid />} name="All Tasks" />;
}
