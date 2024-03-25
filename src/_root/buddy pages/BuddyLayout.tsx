import { Outlet } from 'react-router-dom';
import { useUserContext } from '../../../context/AuthContext';
import LeftBar from '../shared/LeftBar';
import TopBar from '../shared/TopBar';
import RightBar from '../shared/RightBar';
import BottomBar from '../shared/BottomBar';

function BuddyLayout() {
    const {user} = useUserContext()
    console.log(user.role);
    return (
      <>
        <div className="w-full md:flex">
          <TopBar/>
          <LeftBar/>
          <section className="flex flex-1 h-full">
          <Outlet/>
          </section>
          <RightBar/>
          <BottomBar/>
        </div>
      </>
    )
}

export default BuddyLayout