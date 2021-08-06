import React, { Component } from "react";
import BoardService from "../service/BoardService";

class CreatBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seq: this.props.match.params.seq,
      title: "",
      content: "",
    };

    // title, content 빈 문자열로 state 설정

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentHandler = this.changeContentHandler.bind(this);
    // title, content 입력 시 state값 변경

    this.createBoard = this.createBoard.bind(this);
  }

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };

  changeContentHandler = (event) => {
    this.setState({ content: event.target.value });
  };
  // state update

  createBoard = (event) => {
    event.preventDefault();
    let board = {
      title: this.state.title,
      content: this.state.content,
    };
    console.log("board => " + JSON.stringify(board));
    if (this.state.seq === "_create") {
      BoardService.createBoard(board).then((res) => {
        this.props.history.push("/board");
      });
    } else {
      BoardService.updateBoard(this.state.seq, board).then((res) => {
        this.props.history.push("/board");
      });
    }
  };
  // register 버튼 클릭 시 api에 리퀘스트 보냄

  cancel() {
    this.props.history.push("/board");
  }
  // 취소 시 목록 페이지로 이동

  getTitle() {
    if (this.state.seq === "_create") {
      return <h3 className="text-center">새글을 작성해주세요</h3>;
    } else {
      return <h3 className="text-center">{this.state.no}글을 수정 합니다.</h3>;
    }
  }

  componentDidMount() {
    if (this.state.no === "_create") {
      return;
    } else {
      BoardService.getOneBoard(this.state.seq).then((res) => {
        let board = res.data;
        console.log("board => " + JSON.stringify(board));

        this.setState({
          title: board.title,
          content: board.content,
        });
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3> Post Add</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="Title"
                      name="title"
                      className="form-control"
                      value={this.state.title}
                      onChange={this.changeTitleHandler}
                    />
                  </div>
                  <div>
                    <label>Content</label>
                    <textarea
                      placeholder="Content"
                      name="content"
                      className="form-control"
                      value={this.state.content}
                      onChange={this.changeContentHandler}
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    style={{ margin: "20px" }}
                    onClick={this.createBoard}
                  >
                    Register
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatBoardComponent;
