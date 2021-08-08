import React, { Component } from "react";
import BoardService from "../service/BoardService";

class CreatBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seq: this.props.match.params.seq,
      // 글 작성인지 수정인지 구분을 위한 파라미터
      title: "",
      content: "",
    };
    // title, content 빈 문자열로 state 설정

    this.changeTitleHandler = this.changeTitleHandler.bind(this);
    this.changeContentHandler = this.changeContentHandler.bind(this);
    // 폼 양식에 title, content 입력 시 state값 변경

    this.createBoard = this.createBoard.bind(this);
    // Register 버튼 클릭 시 createBoard 함수 바인드
  }

  changeTitleHandler = (event) => {
    this.setState({ title: event.target.value });
  };
  changeContentHandler = (event) => {
    this.setState({ content: event.target.value });
  };
  // title, content에 값 대입, state update

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
      }); // Register 버튼 클릭 시 api에 작성 리퀘스트 보냄
    } else {
      BoardService.updateBoard(this.state.seq, board).then((res) => {
        this.props.history.push("/board");
      }); //register 버튼 클릭 시 api에 수정 리퀘스트 보냄
    }
  };

  cancel() {
    this.props.history.push("/board");
  }
  // 취소 시 목록 페이지로 이동

  getTitle() {
    if (this.state.seq === "_create") {
      return <h3 className="text-center">새글을 작성해주세요</h3>;
    } else {
      return <h3 className="text-center">{this.state.seq}글을 수정 합니다.</h3>;
    }
  }
  // 작성인지 수정인지 구분해 페이지 타이틀 출력

  componentDidMount() {
    if (this.state.seq === "_create") {
      return;
      // 로딩 시 게시글 작성이면 비어있는 폼 출력
    } else {
      BoardService.getOneBoard(this.state.seq).then((res) => {
        let board = res.data;
        console.log("board => " + JSON.stringify(board));

        this.setState({
          title: board.title,
          content: board.content,
        });
        // 게시글 수정인 경우 해당 seq의 객체 값을 가져옴
        // board의 title, content가져와서 state update
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              {/* getTitle 함수 실행 */}
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
                  {/* title 작성 -> changeTitleHandler 함수 바인드 */}
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
                  {/* content 작성 -> changeContentHandler 함수 바인드 */}
                  <button
                    className="btn btn-success"
                    style={{ margin: "20px" }}
                    onClick={this.createBoard}
                  >
                    Register
                  </button>
                  {/* Register 버튼 클릭 시 createBoard 함수 바인드 */}
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                  >
                    Cancel
                  </button>
                  {/* Cancel 버튼 클릭 시 cancel 함수 바인드 */}
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
