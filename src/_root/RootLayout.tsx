import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../../context/AuthContext"
import CounsellorLayout from "./counsellor pages/CounsellorLayout";
import AdminLayout from "./admin pages/AdminLayout";

function RootLayout() {
  const {user} = useUserContext()
  if (user.email === "") 
  {
    return <Navigate to="/login" />;
  } 
  else if (user.role === "admin") 
  {
    return <AdminLayout />;
  } 
  else if (user.role === "student") 
  {
    return <CounsellorLayout />;
  }
  else{
    
  }
}

export default RootLayout