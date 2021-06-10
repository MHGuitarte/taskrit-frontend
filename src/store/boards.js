import BoardService from '@/service/BoardService';

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
  },
  mutations: {
    boards: (state, boards) => (state.boards = boards),
    selectedBoard: (state, selectedBoard) =>
      (state.selectedBoard = selectedBoard),
  },
  getters: {
    boards: (state) =>
      state.boards.sort((a, b) => a.name.localeCompare(b.name)),
    selectedBoard: (state) => state.selectedBoard,
  },
  actions: {
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
  },
};
