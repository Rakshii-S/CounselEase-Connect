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
                    src="/assets/mind.png"
                    alt="logo"
                    width={60}
                    height={36}
                />
                <p className="text-xl">CounselEase Connect</p>
            </Link>
            <Link to="" className='flex gap-3 items-center'>
                <img 
                src='https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710547200&semt=ais'
                alt="profile"
                className='h-14 w-14 rounded-full'
                />
                <div className='flex flex-col'>
                    <p className='body-bold'>
                        demo name
                    </p>
                    <p className='small-regular text-light-3'>
                        @demooo
                    </p>
                </div>
                </Link>
                <ul className='flex flex-col gap-6'>
               {sidebarLinksAdmin .map((link:INavLink) =>{
                const isActive = pathname === link.route;
                return (
                    <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                        <NavLink
                        to={link.route}
                        className="flex gap-4 items-center p-4">
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
        <Link to="" className='flex ml-4 gap-3 items-center'>
                <img 
                src='assets/exit.png'
                alt="profile"
                width={25}
                />
                <p>Logout</p>
        </Link>
        </nav>
  )
}

export default LeftBar