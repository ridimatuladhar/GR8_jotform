import { BrowserRouter, Route, Routes } from "react-router-dom";
// import AdminPanel from '../../AdminPanel/AdminPanel';
import Build from "../Pages/Build"
import Settings from "../Pages/Settings";
import Publish from "../Pages/Publish";

const MyRoutes = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Build />} />
    <Route path="/settings" element={< Settings/>} />
    <Route path="/publish" element={<Publish /> } />

   {/* <Route path='/admin' element={<AdminPanel/>}/> */}
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default MyRoutes
