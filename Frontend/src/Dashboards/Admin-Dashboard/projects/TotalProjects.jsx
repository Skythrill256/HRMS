import { useNavigate, useParams, Routes, Route,  } from "react-router-dom";
import Workordergeneratedproject from "./workordergeneratedproject";
import ProjectProfile from "./ProjectProfile";
const TotalProjects = () => {
  return(
    <Routes>
      <Route path="/" element={<Workordergeneratedproject/>}/>
      <Route path="profile/:projectId" element={<ProjectProfile/>}/>
      
    </Routes>
  )
}

export default TotalProjects;