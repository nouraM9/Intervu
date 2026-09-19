import HomePage from "./pages/HomePage";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";

// inside your App component's return, usually near the top:
<Toaster position="top-center" />;
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<HomePage />} />
          <Route path="interview-setup" element={<InterviewSetup />} />
          <Route path="interview" element={<Interview />} />
        </Route>
        ,
      </>,
    ),
  );
  return <RouterProvider router={router} />;
}

export default App;
