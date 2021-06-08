import axios from 'axios';
import user from '@/utils/User';

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
        await axios.get(getBoardsUrl(user.id), null, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
      ).data;

      return (boards || []).map((board) => parseBoard(board));
    } catch (error) {
      console.error(error);
    }
  },

  createBoard: async ({ name, description }) => {
    try {
      return await axios.post(
        createBoardUrl,
        {
          userId: user.id,
          name,
          description,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (error) {
      console.error(error);
    }
  },
};

export default BoardService;