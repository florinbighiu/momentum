import { TasksList } from "../components/TasksList";
import { TbSun } from "react-icons/tb";

const isToday = (t) => {
    if (!t.dueDate) return false;
    const d = new Date(t.dueDate);
    const now = new Date();
    return d.getFullYear() === now.getFullYear()
        && d.getMonth() === now.getMonth()
        && d.getDate() === now.getDate();
};

export default function TodayTasks() {
    return <TasksList icon={<TbSun />} name="My Day" filter={isToday} />;
}
