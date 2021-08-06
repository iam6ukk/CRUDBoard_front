import React, { Component } from "react";
import BoardService from "../service/BoardService";

class ReadBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seq: this.props.match.params.seq,
      board: {},
    };

    this.goToUpdate = this.goToUpdate.bind(this);
  }

  componentDidMount() {
    BoardService.getOneBoard(this.state.seq).then((res) => {
      this.setState({ board: res.data });
      console.log("get result => " + JSON.stringify(res.data));
    });
  }

  //   returnDate(cTime, uTime) {
  //     return (
  //       <div className="row">
  //         <label>
  //           작성일: {cTime} / 수정일 : {uTime}
  //         </label>
  //       </div>
  //     );
  //   }

  goToList() {
    this.props.history.push("/board");
  }

  goToUpdate = (event) => {
    event.preventDefault();
    this.props.history.push(`/create/${this.state.seq}`);
  };

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
  render() {
    return (
      <div>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center">Post Detail</h3>
          <div className="card-body">
            <div className="row">
              <label> Title </label> : {this.state.board.title}
            </div>
            <div className="row">
              <label> Content </label> : <br></br>
              <textarea value={this.state.board.content} readOnly />
            </div>
            {/* {this.returnDate(
              this.state.board.createdTime,
              this.state.board.updatedTime
            )}
           */}
            <button
              className="btn btn-primary"
              onClick={this.goToList.bind(this)}
              style={{ marginLeft: "10px" }}
            >
              Go Board List
            </button>
            <button
              className="btn btn-info"
              onClick={this.goToUpdate}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.deleteView()}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReadBoardComponent;
