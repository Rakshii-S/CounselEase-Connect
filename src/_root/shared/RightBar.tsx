import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import {sidebarLinksAdmin} from '../../../constants/index.ts'
import {INavLink} from '../../../types/index.ts'
import { Button } from "../../../@/components/ui/button.tsx";
import { useUserContext } from "../../../context/AuthContext.tsx";
function RightBar() 
{
    //constants
    const {pathname} = useLocation();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    //tanstack query, appwrite and context
    const {mutate: signOut, isSuccess} = useSignOutAccout();
    const {user} = useUserContext();

    useEffect(()=>{
        if(isSuccess) navigate(0);
    },[isSuccess])
    return (
    <div>
        {open?(
            <nav className='rightsidebar'>
            <div className='flex flex-col gap-11'>
                <Button onClick={()=>setOpen(false)}>
                    <img 
                     src="/assets/cross.png"
                     alt=""
                     width={40}
                     className={`invert-white`}/>
                </Button>
                <Link to="" className='flex gap-3 items-center'>
                    <img 
                    src={`https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710547200&semt=ais`}
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
                        <li className={`leftsidebar-link group`}>
                            <NavLink
                            to=""
                            className="flex gap-4 items-center p-1">
                                <img 
                                src="/assets/email.png"
                                alt=""
                                width={40}
                                className={`invert-white`}/>
                                Inbox
                            </NavLink>
                        </li>
                        <li className={`leftsidebar-link group`}>
                            <NavLink
                            to=""
                            className="flex gap-4 items-center p-1">
                                <img 
                                src="/assets/notification.png"
                                alt=""
                                width={40}
                                className={`invert-white`}/>
                                Notification
                            </NavLink>
                        </li>
                        <li className={`leftsidebar-link group`}>
                            <Button
                            onClick={()=>navigate('/')}
                            className="flex gap-4 items-center p-1">
                                <img 
                                src="/assets/edit.png"
                                alt=""
                                width={37}
                                className={`invert-white`}/>
                                Edit profile
                            </Button>
                        </li>
                </ul>
            </div>
            </nav>
        ):(
            <Button onClick={()=>setOpen(true)}>
                <div className="m-5">
                <img 
                     src="/assets/menu.png"
                     alt=""
                     width={40}
                     className='invert-white'/>
                </div>
            </Button>
        )}
    </div>
  )
}

export default RightBar