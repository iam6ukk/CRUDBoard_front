import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
            <Route path="/create/:seq" component={CreatBoardComponent}></Route>
            <Route path="/read/:seq" component={ReadBoardComponent}></Route>
          </Switch>
          {/* api별로 페이지 전환하기 위해 switch 사용 */}
        </div>
      </Router>
    </div>
    // -react-router 적용대상 컴포넌트를 <Router>로 감쌈
    // 렌더링
  );
}

export default App;
