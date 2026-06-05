import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllTasks } from "../api/fetchAllTasks";
import { deleteTask } from "../api/deleteTask";
import { markAsImportant } from "../api/markAsImportant";
import { removeImportantState } from "../api/removeImportantState";
import { setCompleted } from "../api/setCompleted";
import { updateTask } from "../api/updateTask";

export const TODO_KEY = (userId, orgId) => ["todos", userId, orgId ?? null];

export function useTodos(userId, organizationId) {
    return useQuery(
        TODO_KEY(userId, organizationId),
        () => fetchAllTasks(userId, organizationId),
        { enabled: !!userId }
    );
}

export function useDeleteTodo(userId, organizationId) {
    const qc = useQueryClient();
    return useMutation((id) => deleteTask(id), {
        onSuccess: () => qc.invalidateQueries(TODO_KEY(userId, organizationId)),
    });
}

export function useToggleImportant(userId, organizationId) {
    const qc = useQueryClient();
    return useMutation(
        ({ id, isImportant }) => isImportant ? removeImportantState(id) : markAsImportant(id),
        { onSuccess: () => qc.invalidateQueries(TODO_KEY(userId, organizationId)) }
    );
}

export function useCompleteTodo(userId, organizationId) {
    const qc = useQueryClient();
    return useMutation((id) => setCompleted(id), {
        onSuccess: () => qc.invalidateQueries(TODO_KEY(userId, organizationId)),
    });
}

export function useUpdateTodo(userId, organizationId) {
    const qc = useQueryClient();
    return useMutation(({ id, data }) => updateTask(id, data), {
        onSuccess: () => qc.invalidateQueries(TODO_KEY(userId, organizationId)),
    });
}
