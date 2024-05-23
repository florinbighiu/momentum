import { fetchTodayTasks } from "../api/fetchTodayTasks";
import { TasksList } from "../components/TasksList";
import { BsSun } from "react-icons/bs";

export default function TodayTasks() {
    return (
        <TasksList icon={<BsSun/>} name={"My day"} handleFetchData={fetchTodayTasks} />
    );
}