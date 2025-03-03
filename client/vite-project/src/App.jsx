import Header from './components/header/Header'
import Home from './pages/HomePage/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserDashboard from './pages/UserDashboard/UserDashboard'
import ReportIssue from './pages/ReportIssue/ReportIssue'
import Login from './pages/LogIn/Login'
import Signup from './pages/SignUp/Signup'
import RepresentativeProfile from './pages/RepresentativeProfile/RepresentativeProfile'
import RepresentativeDashboard from './pages/RepresentativeDashboard/RepresentativeDashboard'
import './App.css'

function App() {
  const timeAgo = (updatedAt) => {
    const now = Date.now();
    const diffInMs = now - new Date(updatedAt).getTime();
  
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <>
     <BrowserRouter>
     <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/user" element={<UserDashboard timeAgo={timeAgo}/>} />
        <Route path="/RepresentativeDashboard" element={<RepresentativeDashboard timeAgo={timeAgo}/>}/>
        <Route path="/represantativeProfile/:id" element={<RepresentativeProfile/>} />
        <Route path="/reportIssue" element={<ReportIssue/>} />
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
