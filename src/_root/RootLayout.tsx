import { Navigate, Outlet } from "react-router-dom"
import { useUserContext } from "../../context/AuthContext"

function RootLayout() {
  const {user} = useUserContext()
  return (
    <>
      {user.email == ""?
      (
        <Navigate to="/login"/>
      ):(
        <Outlet/>
      )}
    </>
  )
}

export default RootLayout