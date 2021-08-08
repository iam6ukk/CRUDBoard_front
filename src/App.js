import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// react router dom
// 페이지 로딩 없이 페이지에 필요한 컴포넌트를 불러와 렌더링 하여 보여주도록 도와줌
import ListBoardComponent from "./components/ListBoardComponent";
import CreatBoardComponent from "./components/CreateBoardComponent";
import ReadBoardComponent from "./components/ReadBoardComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListBoardComponent}></Route>
            <Route path="/board" component={ListBoardComponent}></Route>
            {/* 게시글 목록 페이지 */}
            <Route path="/create/:seq" component={CreatBoardComponent}></Route>
            {/* 게시글 작성 페이지 */}
            <Route path="/read/:seq" component={ReadBoardComponent}></Route>
            {/* 게시글 상세 페이지 */}
          </Switch>
          {/* url별로 페이지 전환하기 위해 switch 사용 */}
        </div>
      </Router>
    </div>
    // react-router 적용대상 컴포넌트를 <Router>로 감쌈
    // 렌더링
  );
}

export default App;
