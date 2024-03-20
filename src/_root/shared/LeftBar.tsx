import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import {sidebarLinksAdmin} from '../../../constants/index.ts'
import {INavLink} from '../../../types/index.ts'
function LeftBar() 
{
    const {pathname} = useLocation();
    // const {mutate: signOut, isSuccess} = useSignOutAccout();
    const navigate = useNavigate();
    // const {user} = useUserContext();

    // useEffect(()=>{
    //     if(isSuccess) navigate(0);
    // },[isSuccess])
    return (
    <nav className='leftsidebar'>
        <div className='flex flex-col gap-11'>
            <Link to="/" className='flex gap-3 items-center'>
                <img 
                    src="/assets/mainlogo.png"
                    alt="logo"
                    width={60}
                    height={36}
                />
                <p className="text-xl">CounselEase Connect</p>
            </Link>
                <ul className='flex flex-col gap-6'>
               {sidebarLinksAdmin .map((link:INavLink) =>{
                const isActive = pathname === link.route;
                return (
                    <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                        <NavLink
                        to={link.route}
                        className="flex gap-4 items-center p-1">
                            <img 
                            src={link.imgURL}
                            alt={link.label}
                            width={40}
                            className={`invert-white $ {isActive && 'invert-white'}`}/>
                            {link.label}
                        </NavLink>
                    </li>
                )
               })}
            </ul>
        </div>
        <Link to="" className='flex ml-4 mt-8 items-center'>
                <img 
                src='assets/logout.png'
                alt="profile"
                width={38}
                className={`invert-white`}
                />
                <p className="ml-3 text-bold">Logout</p>
        </Link>
        </nav>
  )
}

export default LeftBar