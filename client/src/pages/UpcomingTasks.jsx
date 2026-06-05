import { TasksList } from "../components/TasksList";
import { TbCalendarClock } from "react-icons/tb";

const isUpcoming = (t) => {
    if (!t.dueDate || t.completed) return false;
    const due = new Date(t.dueDate);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const sevenDays = new Date(today); sevenDays.setDate(sevenDays.getDate() + 7);
    due.setHours(0, 0, 0, 0);
    return due > today && due <= sevenDays;
};

export function UpcomingTasks() {
    return <TasksList icon={<TbCalendarClock />} name="Upcoming" filter={isUpcoming} />;
}
