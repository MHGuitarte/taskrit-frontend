import BoardService from '@/service/BoardService';
import ListService from '@/service/ListService';
import TaskService from '@/service/TaskService';

export default {
  namespaced: true,
  state: {
    boards: [],
    selectedBoard: {
      id: '',
      name: '',
      description: '',
      role: '',
      lists: [],
    },
    selectedListId: '',
    selectedTaskId: '',
    modalInfo: {
      modalTitle: '',
      modalTargetForm: '',
    },
  },
  mutations: {
    boards: (state, boards) => (state.boards = boards),
    selectedBoard: (state, selectedBoard) =>
      (state.selectedBoard = selectedBoard),
    modalInfo: (state, modalInfo) => (state.modalInfo = modalInfo),
    selectedListId: (state, selectedListId) => state.selectedListId = selectedListId,
    selectedTaskId: (state, selectedTaskId) => state.selectedTaskId = selectedTaskId,
  },
  getters: {
    boards: (state) =>
      state.boards.sort((a, b) => a.name.localeCompare(b.name)),
    selectedBoard: (state) => state.selectedBoard,
    modalInfo: state => state.modalInfo,
    selectedListId: state => state.selectedListId,
    lists: state => state.selectedBoard.lists,
    selectedTaskId: state => state.selectedTaskId,
    getSelectedTaskInfo: state => {
      const list = state.selectedBoard.lists.find(list => list.id === state.selectedListId);
      return list.tasks.find(task => task.id === state.selectedTaskId);
    }
  },
  actions: {
    setSelectedTaskId({ commit }, { selectedTaskId }) {
      commit("selectedTaskId", selectedTaskId);
    },

    clearSelectedTaskId({ dispatch }) {
      dispatch("setSelectedTaskId", "");
    },

    setSelectedListId({ commit }, { selectedListId }) {
      commit("selectedListId", selectedListId);
    },

    clearSelectedListId({ dispatch }) {
      dispatch("setSelectedListId", "");
    },

    setModalInfo({ commit }, { modalTitle, modalTargetForm }) {
      commit("modalInfo", { modalTitle, modalTargetForm });
    },

    clearModalInfo({ dispatch }) {
      dispatch("modalInfo", { modalTitle: "", modalTargetForm: "" });
    },

    setSelectedBoard({ commit }, { selectedBoard }) {
      commit('selectedBoard', selectedBoard);
    },

    clearSelectedBoard({ commit }) {
      commit('selectedBoard', {
        id: '',
        name: '',
        description: '',
        role: '',
        lists: [],
      });
    },

    async getBoards({ commit }, { user }) {
      try {
        const boards = await BoardService.getBoards(user);
        if (boards) {
          commit('boards', boards);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async createBoard({ commit }, { user, name, description }) {
      try {
        const newBoard = await BoardService.createBoard({
          user,
          name,
          description,
        });

        if (newBoard.id) {
          commit('selectedBoard', newBoard);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async getBoardById({ commit }, { user, boardId }) {
      try {
        const board = await BoardService.getBoardById({ user, boardId });

        if (board.id) {
          commit('selectedBoard', board);
          return true;
        }

        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async createList({ dispatch }, { user, name, description, boardId }) {
      try {
        const newList = await ListService.createList({ token: user.token, boardId, name, description });

        if (newList.id) {
          dispatch("getBoardById", { user, boardId });
          return true;
        }

        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async createTask({ dispatch }, { user, title, description, effort, estimate, listId, boardId }) {
      try {
        const newTask = await TaskService.createTask({ token: user.token, title, description, effort, estimate, listId });

        if (newTask.id) {
          dispatch("getBoardById", { user, boardId });
          return true;
        }

        return false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async moveTask({ dispatch }, { user, taskId, listId, boardId }) {
      try {
        const response = await TaskService.moveTask({ token: user.token, taskId, listId });

        if (response === true) {
          dispatch("getBoardById", { user, boardId });
        }

        return response || false;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async setTaskPending({ dispatch }, { user, taskId, pending, boardId }) {
      try {
        const response = await TaskService.setTaskPending({ token: user.token, taskId, pending });

        if (response === true) {
          dispatch("getBoardById", { user, boardId });
        }

        return response || false;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  },
};
