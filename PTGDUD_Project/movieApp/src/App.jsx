import Home from "./pages/Home";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import AboutUs from "./pages/AboutUs";
import Infor from "./pages/Infor";
import Container from "./pages/Container";
import NotFound from "./pages/NotFound";
import Watch from "./pages/watch";
import ListMovies from "./pages/ListMovies";
import ListType from "./pages/ListType";
import { type } from "./global/Type";
import "@coreui/coreui/dist/css/coreui.min.css";
import { LoadingProvider } from "./global/LoadingProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/User";
import OAuthSuccess from "./pages/OAuthSuccess";

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Container />}>
            <Route path="/" element={<Home />} />
            <Route path="/list">
              <Route path="find_movies" element={<ListMovies title="" />} />
              <Route
                path="top_movies"
                element={<ListMovies title="Phim Hot" />}
              />
              {type.map((item) => {
                return (
                  <Route
                    key={item._id}
                    path={item.slug}
                    element={<ListMovies title={item.name} />}
                  />
                );
              })}
            </Route>
            <Route path="/listType/:slug" element={<ListType />}></Route>
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/infor/:slug" element={<Infor />} />
            <Route path="/watch/:slug" element={<Watch />}></Route>
            <Route path="/user/:id" element={<User />}></Route>
            <Route path="/oauth-success" element={<OAuthSuccess />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
