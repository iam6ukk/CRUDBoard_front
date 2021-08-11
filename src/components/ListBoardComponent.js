import React, { Component } from "react";
import BoardService from "../service/BoardService";

class ListBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      p_num: 1, // 페이지 번호 저장
      paging: {}, // 페이징 처리를 위한 객체
    };
    // state 설정

    this.createBoard = this.createBoard.bind(this);
    // Post Add 버튼 클릭 시 동작할 createBoard 함수 바인드
  }

  componentDidMount() {
    BoardService.getBoards(this.state.p_num).then((res) => {
      this.setState({
        p_num: res.data.pageNum,
        paging: res.data,
        boards: res.data.list,
      });
    });
  }
  // componentDidMount : 리액트의 생명주기 메소드
  // BoardService의 getBoards로 해당 페이지 번호의 데이터 가져옴
  // 데이터 -> 글 목록 + 페이지 객체
  // console로 로그 확인하기

  createBoard() {
    this.props.history.push("/create/_create");
  }
  // Post Add 버튼 클릭 시 게시글 작성 페이지로 이동

  readBoard(seq) {
    this.props.history.push(`/read/${seq}`);
  }
  // 게시글 seq, title 클릭 시 상세 페이지로 이동

  listBoard(p_num) {
    console.log("pageNum : " + p_num);
    BoardService.getBoards(p_num).then((res) => {
      this.setState({
        p_num: res.data.pageNum,
        paging: res.data,
        boards: res.data.list,
      });
    });
    // 지정한 페이지 번호의 글 목록 출력
  }

  viewPaging() {
    const pageNums = [];
    console.log(this.state.paging);

    for (
      let i = this.state.paging.navigateFirstPage;
      i <= this.state.paging.navigateLastPage;
      i++
    ) {
      pageNums.push(i);
    }
    // i 초기값은 첫 페이지로 설정
    // 마지막 페이지까지 반복하며 1씩 증가
    // 페이지 버튼 표시

    return pageNums.map((page) => (
      <li className="page-item" key={page.toString()}>
        <a className="page-link" onClick={() => this.listBoard(page)}>
          {page}
        </a>
      </li>
    ));
    // a 태그로 페이지 이동
  }

  // 이전 페이지
  // isPagingPrev() {
  //   if (this.state.paging.prev) {
  //     return (
  //       <li className="page-item">
  //         <a
  //           className="page-link"
  //           onClick={() => this.listBoard(this.state.paging.currentPageNum - 1)}
  //           tabindex="-1"
  //         >
  //           Prev
  //         </a>
  //       </li>
  //     );
  //   }
  // }

  // 다음 페이지
  // isPagingNext() {
  //   if (this.state.paging.next) {
  //     return (
  //       <li className="page-item">
  //         <a
  //           className="page-link"
  //           onClick={() => this.listBoard(this.state.paging.currentPageNum + 1)}
  //           tabIndex="-1"
  //         >
  //           Next
  //         </a>
  //       </li>
  //     );
  //   }
  // }

  // 첫 페이지
  isMoveToFirstPage() {
    if (this.state.p_num != 1) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(1)}
            tabIndex="-1"
          >
            First
          </a>
        </li>
        // 첫 페이지라 1로 고정
      );
    }
  }

  // 마지막 페이지
  isMoveToLastPage() {
    if (this.state.p_num != this.state.paging.navigateLastPage) {
      return (
        <li className="page-item">
          <a
            className="page-link"
            onClick={() => this.listBoard(this.state.paging.navigateLastPage)}
            tabIndex="-1"
          >
            Last({this.state.paging.navigateLastPage})
          </a>
        </li>
        // 페이지가 몇 까지 있는지 출력해줌
      );
    }
  }
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
        <div className="row">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {this.isMoveToFirstPage()}
              {/* {this.isPagingPrev()} */}
              {this.viewPaging()}
              {/* {this.isPagingNext()} */}
              {this.isMoveToLastPage()}
            </ul>
          </nav>
        </div>
        {/* 페이징 출력 */}
      </div>
      // 렌더링
    );
  }
}

export default ListBoardComponent;
