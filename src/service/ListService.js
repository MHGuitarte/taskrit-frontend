import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8080';

const getListsUrl = (boardId) => `${API_URL}/list/${boardId}`;
const getListDetailsUrl = (listId) => `${API_URL}/list/details/${listId}`;
const createListUrl = `${API_URL}/list/create`;

const options = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

const ListService = {
    getLists: async ({ token, boardId }) => {
        try {
            const lists = await (
                await axios.get(getListsUrl(boardId), options(token))).data;

            return lists || [];
        } catch (error) {
            console.error(error);
        }
    },

    getListDetails: async ({ token, listId }) => {
        try {
            const list = await (
                await axios.get(getListDetailsUrl(listId), options(token))).data

            return list || {};
        } catch (error) {
            console.error(error);
        }
    },

    createList: async ({ token, boardId, name, description }) => {
        try {
            const newList = await (await axios.post(createListUrl, {
                boardId,
                name,
                description
            }, options(token))).data;

            return newList;
        } catch (error) {
            console.error(error);
        }
    }
}

export default ListService;