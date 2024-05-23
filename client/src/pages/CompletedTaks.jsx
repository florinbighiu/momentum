import { IoCloudDoneOutline } from "react-icons/io5";
import { TasksList } from "../components/TasksList";
import { fetchCompletedTasks } from "../api/fetchCompletedTasks";

export function CompletedTasks() {
    return (
        <TasksList icon={<IoCloudDoneOutline />} name={"Completed tasks"} handleFetchData={fetchCompletedTasks} />
    );
}