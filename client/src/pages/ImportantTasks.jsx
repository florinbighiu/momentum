import { FaRegStar } from "react-icons/fa";
import { TasksList } from "../components/TasksList";
import { fetchImportantTasks } from "../api/fetchImportantTasks";

export function ImportantTasks() {
    return (
        <TasksList icon={<FaRegStar />} name={"Important"} handleFetchData={fetchImportantTasks} />
    );
}