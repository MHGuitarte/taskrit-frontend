import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:8080';

const getBoardsUrl = (userId) => `${API_URL}/board/${userId}`;
const createBoardUrl = `${API_URL}/board/create`;

const parseBoard = ({
  boardId,
  boardName,
  boardDescription,
  boardRole,
  boardLists,
}) => ({
  id: boardId,
  name: boardName,
  description: boardDescription,
  role: boardRole,
  lists: boardLists,
});

const BoardService = {
  getBoards: async (user) => {
    try {
      const boards = await (
        await axios.get(getBoardsUrl(user.id), {
          headers: { Authorization: `Bearer ${user.token}` },
        })
      ).data;

      return (boards || []).map((board) => parseBoard(board));
    } catch (error) {
      console.error(error);
    }
  },

  createBoard: async ({ user, name, description }) => {
    try {
      const board = await (
        await axios.post(
          createBoardUrl,
          {
            userId: user.id,
            name,
            description,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
      ).data;

      return parseBoard(board);
    } catch (error) {
      console.error(error);
    }
  },
};

export default BoardService;
