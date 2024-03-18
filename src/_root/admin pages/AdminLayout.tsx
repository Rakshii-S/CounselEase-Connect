import { Outlet } from "react-router-dom"
import LeftBar from "../shared/LeftBar"
import TopBar from "../shared/TopBar"
import BottomBar from "../shared/BottomBar"

function AdminLayout() {
  return (
    <div className="w-full md:flex">
      <TopBar/>
      <LeftBar/>

      <section className="flex flex-1 h-full">
        <Outlet/>
      </section>
      <BottomBar/>
    </div>
  )
}

export default AdminLayout