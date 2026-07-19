import HomePage from "./assets/pages/HomePage"
import {Route , createBrowserRouter, createRoutesFromElements,RouterProvider} from 'react-router-dom';
import InterviewSetup from "./assets/pages/InterviewSetup";
import Intervew from "./assets/pages/Intervew";

function App() {

    const router = createBrowserRouter(createRoutesFromElements(
      <Route>
        <Route path="/" element={<HomePage />}/>
        <Route path="/interview-setup" element={<InterviewSetup />}/>
        <Route path="/interview" element={<Intervew />}/>


      </Route>

    ));
    return <RouterProvider router={router} />
  
};

export default App
