import React, { Component } from "react";
import BoardService from "../service/BoardService";

class ListBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
    };
    // boards를 빈배열로 state 설정

    this.createBoard = this.createBoard.bind(this);
    // Post Add 버튼 클릭 시 함수 바인드
  }

  componentDidMount() {
    BoardService.getBoards().then((res) => {
      this.setState({ boards: res.data });
    });
  }
  // componentDidMount : 리액트의 생명주기 메소드
  // PostService의 메소드 getPosts로 데이터를 가져옴
  // 데이터를 boards에 넣음 state update

  createBoard() {
    this.props.history.push("/create/_create");
  }
  // Post Add 버튼 클릭 시 페이지 이동

  readBoard(seq) {
    this.props.history.push(`/read/${seq}`);
  }

  render() {
    return (
      <div>
        <h3>CURD Board List</h3>
        <div>
          <button
            className="btn btn-primary"
            style={{ margin: "20px" }}
            onClick={this.createBoard}
          >
            Post Add
          </button>
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
                <tr key={board.seq}>
                  <td>{board.seq}</td>
                  <td>
                    <a onClick={() => this.readBoard(board.seq)}>
                      {board.title}
                    </a>
                  </td>
                  <td>{board.content}</td>
                  <td>{board.reg_dt}</td>
                </tr>
              ))}
              {/* map함수 사용해서 boards의 데이터 출력 */}
            </tbody>
          </table>
        </div>
      </div>
      // 렌더링
    );
  }
}

export default ListBoardComponent;
