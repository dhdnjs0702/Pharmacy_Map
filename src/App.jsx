import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import SearchResults from "./pages/SearchResults";
import DetailPage from "./pages/DetailPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/mainpage"} element={<MainPage />} />
        <Route path={"/signup"} element={<SignUpPage />} />
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/mypage"} element={<MyPage />} />
        <Route path={"/searchresults"} element={<SearchResults />} />
        <Route path={"/detail"} element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
