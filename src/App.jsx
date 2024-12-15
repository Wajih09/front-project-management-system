import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/home/Home'
import Navbar from './pages/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import ProjectDetails from './pages/projectDetails/ProjectDetails'
import IssueDetails from './pages/issueDetails/IssueDetails'
import Subscription from './pages/subscription/Subscription'
import Auth from './pages/auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './redux/auth/Action'
import { fetchProjects } from './redux/project/Action'
import UpgradeSuccess from './pages/subscription/UpgradeSuccess'
import AcceptInvitation from './pages/project/AcceptInvitation'

function App() {
  //const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  const {auth}= useSelector((store)=>store);
  useEffect(()=>{
    dispatch(getUser())
    dispatch(fetchProjects({}))
  }, [auth.jwt]); //means we dispatch getUser (or getJwt) precisely whenever [auth.jwt] change === watch in vuejs 1h41min
  //console.log("auth = ", auth);
  return (
    <>
      {
        auth.user ? <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/project/:projectId/issue/:issueId" element={<IssueDetails />} />
            <Route path="/upgrade_plan" element={<Subscription />} />
            <Route path="/upgrade_plan/success" element={<UpgradeSuccess />} />
            {/* here we're linking a path which contains a query params, but of course no mention of it 4h15min https://www.youtube.com/watch?v=qis9sMaiqN4&t=12885s&ab_channel=CodeWithZosh */}
            <Route path="/accept_invitation" element={<AcceptInvitation />} /> 
          </Routes>
        </div> : <Auth />
      }
    </>
  )
}

export default App
