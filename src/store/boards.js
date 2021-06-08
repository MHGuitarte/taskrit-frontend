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

    async getBoards({ commit }) {
      try {
        const boards = await BoardService.getBoards();
        if (boards) {
          commit('boards', boards);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async createBoard({ commit }, { name, description }) {
      try {
        const newBoard = await BoardService.createBoard({
          name,
          description,
        });

        console.log(newBoard);

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
  },
};
