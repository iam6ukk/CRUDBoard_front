import React, { Component } from "react";
import BoardService from "../service/BoardService";

class ReadBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seq: this.props.match.params.seq,
      // 게시글 상세 페이지에 사용될 파라미터
      board: {},
    };
    // state 설정

    this.goToUpdate = this.goToUpdate.bind(this);
    // goToUpdate 함수 바인드
  }

  componentDidMount() {
    BoardService.getOneBoard(this.state.seq).then((res) => {
      this.setState({ board: res.data });
      console.log("get result => " + JSON.stringify(res.data));
    });
  }
  // 페이지 로딩시 api와 통신해 글 객체 가져옴

  goToList() {
    this.props.history.push("/board");
  }
  // 게시글 목록 페이지로 이동

  goToUpdate = (event) => {
    event.preventDefault();
    this.props.history.push(`/create/${this.state.seq}`);
  };
  // 게시글 수정을 위해 페이지 이동

  deleteView = async function () {
    if (window.confirm("삭제하나요?")) {
      BoardService.deleteBoard(this.state.seq).then((res) => {
        console.log("delete result => " + JSON.stringify(res));
        if (res.status == 200) {
          this.props.history.push("/board");
        } else {
          alert("삭제 실패");
        }
      });
    }
  };
  // 게시글 삭제 함수, alert창 띄워서 삭제할지 선택
  // alert창에서 확인 버튼 클릭 시 api와 통신해 삭제
  // 성공하면 게시글 목록으로 이동

  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">Post Detail</h3>
          <div className="card-body">
            <div className="row">
              <label> Title </label> : {this.state.board.title}
            </div>
            {/* title의 값 표시 */}
            <div className="row">
              <label> Content </label> : <br></br>
              <textarea value={this.state.board.content} readOnly />
            </div>
            {/* content의 값 표시 */}
            <button
              className="btn btn-primary"
              onClick={this.goToList.bind(this)}
              style={{ marginLeft: "10px" }}
            >
              Go Board
            </button>
            {/* 버튼 클릭 시  goToList함수 바인드 */}
            <button
              className="btn btn-info"
              onClick={this.goToUpdate}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
            {/* 버튼 클릭 시 goToUpdate 함수 바인드 */}
            <button
              className="btn btn-danger"
              onClick={() => this.deleteView()}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
            {/* 버튼 클릭 시 deleteView 함수 바인드 */}
          </div>
        </div>
      </div>
    );
  }
}

export default ReadBoardComponent;
