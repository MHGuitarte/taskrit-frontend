import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:8080';

const getListTasksUrl = (listId) => `${API_URL}/task/${listId}`;
const getTaskDetailsUrl = (taskId) => `${API_URL}/task/details/${taskId}`;
const createTaskUrl = `${API_URL}/task/create`;
const changeTaskListUrl = (taskId, listId) => `${API_URL}/task/move/${taskId}/${listId}`;
const setTaskPendingUrl = (taskId, pending) => `${API_URL}/task/pending/${taskId}?p=${pending}`;

const options = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

const parseTask = task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    effort: task.effort,
    estimate: task.estimate,
    pending: task.pending,
    listId: task.listId
})

const TaskService = {

    getTasks: async ({ token, listId }) => {
        try {
            const tasks = await (
                await axios.get(getListTasksUrl(listId), options(token))).data;

            return (tasks || []).map(task => parseTask(task));
        } catch (error) {
            console.error(error);
        }
    },

    getTaskDetails: async ({ token, taskId }) => {
        try {
            const task = await (
                await axios.get(getTaskDetailsUrl(taskId), options(token))
            ).data;

            return parseTask(task || {});
        } catch (error) {
            console.error(error);
        }
    },

    createTask: async ({ token, title, description, effort, estimate, listId }) => {
        try {
            const task = await (
                await axios.post(createTaskUrl, {
                    title,
                    description,
                    effort,
                    estimate,
                    listId
                }, options(token))
            ).data;

            return parseTask(task);
        } catch (error) {
            console.error(error);
        }
    },

    moveTask: async ({ token, taskId, listId }) => {
        try {
            const response = await (
                await axios.put(changeTaskListUrl(taskId, listId), null, options(token))
            ).data;

            return response;
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    setTaskPending: async ({ token, taskId, pending }) => {
        try {
            const response = await (
                await axios.put(setTaskPendingUrl(taskId, pending), null, options(token))
            ).data;

            return response;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default TaskService;