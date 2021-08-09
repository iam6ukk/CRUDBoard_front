import React, { Component } from "react";
import BoardService from "../service/BoardService";

class ListBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
    };
    // boards를 빈 배열로 state 설정

    this.createBoard = this.createBoard.bind(this);
    // Post Add 버튼 클릭 시 동작할 createBoard 함수 바인드
  }

  componentDidMount() {
    BoardService.getBoards().then((res) => {
      this.setState({ boards: res.data });
    });
  }
  // componentDidMount : 리액트의 생명주기 메소드
  // BoardService의 메소드 getBoards로 데이터를 가져옴
  // 데이터를 boards에 넣음, state update

  createBoard() {
    this.props.history.push("/create/_create");
  }
  // Post Add 버튼 클릭 시 게시글 작성 페이지로 이동

  readBoard(seq) {
    this.props.history.push(`/read/${seq}`);
  }
  // 게시글 제목 클릭 시 상세 페이지로 이동

  render() {
    return (
      <div>
        <h3>CRUD Board</h3>
        <div>
          <button
            className="btn btn-primary"
            style={{ margin: "20px" }}
            onClick={this.createBoard}
          >
            Post Add
          </button>
          {/* 버튼 클릭 시 createBaord 함수 실행 */}
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Seq</th>
                <th>Title</th>
                <th>Content</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.boards.map((board) => (
                // map함수 사용해서 boards의 데이터 출력
                <tr key={board.seq}>
                  <td>
                    <a onClick={() => this.readBoard(board.seq)}>{board.seq}</a>
                  </td>
                  <td>
                    <a onClick={() => this.readBoard(board.seq)}>
                      {board.title}
                    </a>
                  </td>
                  <td>
                    <a onClick={() => this.readBoard(board.seq)}>
                      {board.content}
                    </a>
                  </td>
                  {/* seq, title, content 클릭 시 readBoard 함수 실행 */}
                  <td>{board.reg_dt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      // 렌더링
    );
  }
}

export default ListBoardComponent;
