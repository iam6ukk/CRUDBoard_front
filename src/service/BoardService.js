import axios from "axios";
// axios를 통해 api와 통신

const BOARD_API_BASE_URL = "http://localhost:8080/api/board";
// api의 url

class BoardService {
  getBoards(p_num) {
    return axios.get(BOARD_API_BASE_URL + "?p_num=" + p_num);
  }
  // 게시판 목록

  createBoard(board) {
    return axios.post(BOARD_API_BASE_URL, board);
  }
  // 게시글 작성, axios의 post함수로 통신

  getOneBoard(seq) {
    return axios.get(BOARD_API_BASE_URL + "/" + seq);
  }
  // 게시글 상세, 경로 파라미터로 seq 설정해 통신

  updateBoard(seq, board) {
    return axios.put(BOARD_API_BASE_URL + "/" + seq, board);
  }
  // 게시글 수정, 경로 파라미터로 seq / 수정할 객체 정보를 board에 담아 통신

  deleteBoard(seq) {
    return axios.delete(BOARD_API_BASE_URL + "/" + seq);
  }
  // 게시글 삭제, 경로 파라미터 seq
}

export default new BoardService();
