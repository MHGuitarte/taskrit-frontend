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
    boards: (state) => state.boards,
    selectedBoard: (state) => state.selectedBoard,
  },
  actions: {
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

    async createBoard({ commit, dispatch }, { name, description }) {
      try {
        const newBoard = await BoardService.createBoard({
          name,
          description,
        });

        if (newBoard.id) {
          dispatch('getBoards');

          commit('selectedBoard', {});
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
