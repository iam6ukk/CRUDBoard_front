import axios from "axios";

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";
// api값

class BoardService {
  getBoards() {
    return axios.get(BOARD_API_BASE_URL);
  }
  // getPosts 함수 호출 시 게시판 목록 get

  createBoard(board) {
    return axios.post(BOARD_API_BASE_URL, board);
  }

  getOneBoard(seq) {
    return axios.get(BOARD_API_BASE_URL + "/" + seq);
  }

  updateBoard(seq, board) {
    return axios.pus(BOARD_API_BASE_URL + "/" + seq, board);
  }

  deleteBoard(seq) {
    return axios.delete(BOARD_API_BASE_URL + "/" + seq);
  }
}

export default new BoardService();
