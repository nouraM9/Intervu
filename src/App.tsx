import HomePage from "./pages/HomePage"
import {Route , createBrowserRouter, createRoutesFromElements,RouterProvider} from 'react-router-dom';
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";

function App() {

    const router = createBrowserRouter(createRoutesFromElements(
      <Route>
        <Route path="/" element={<HomePage />}/>
        <Route path="/interview-setup" element={<InterviewSetup />}/>
        <Route path="/interview" element={<Interview />}/>


      </Route>

    ));
    return <RouterProvider router={router} />
  
};

export default App
