import { TbCalendarClock } from "react-icons/tb";
import { TasksList } from "../components/TasksList";
import { fetchUpcomingTasks } from "../api/fetchUpcomingTasks";

export function UpcomingTasks() {
    return (
        <TasksList icon={<TbCalendarClock />} name={"Upcoming schedule"} handleFetchData={fetchUpcomingTasks} />
    );
}