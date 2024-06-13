import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import {
  Bookmark,
  Explore,
  Home,
  NotFound,
  Profile,
  SignIn,
  SignUp,
} from "./pages";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./layout/AuthLayout";
import Setting from "./pages/Settings";
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="bookmark" element={<Bookmark />} />
          <Route path="explore" element={<Explore />} />
          <Route path="setting" element={<Setting />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastProvider />
    </>
  );
}

function ToastProvider() {
  return (
    <ToastContainer
      autoClose={1500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  );
}
