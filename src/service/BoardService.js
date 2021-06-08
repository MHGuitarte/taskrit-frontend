import axios from 'axios';
import User from '@/utils/User';

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
  getBoards: async () => {
    try {
      const boards = await (
        await axios.get(getBoardsUrl(User.getUser.id), {
          headers: { Authorization: `Bearer ${User.getUser.token}` },
        })
      ).data;

      return (boards || []).map((board) => parseBoard(board));
    } catch (error) {
      console.error(error);
    }
  },

  createBoard: async ({ name, description }) => {
    try {
      const board = await (
        await axios.post(
          createBoardUrl,
          {
            userId: User.getUser.id,
            name,
            description,
          },
          { headers: { Authorization: `Bearer ${User.getUser.token}` } }
        )
      ).data;

      return parseBoard(board);
    } catch (error) {
      console.error(error);
    }
  },
};

export default BoardService;
