
import {Link, NavLink, useLocation} from 'react-router-dom'
import { AdminbottombarLinks } from '../../../constants';
import { INavLink } from '../../../types';

function BottomBar() {
  const {pathname} = useLocation();
  return (
    <section className='bottom-bar'>
               {AdminbottombarLinks.map((link:INavLink) =>{
                const isActive = pathname === link.route;
                return (
                        <NavLink
                        to={link.route}
                        key={link.label} className={`${isActive && 'bg-primary-500 rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`}>
                            <img 
                            src={link.imgURL}
                            alt={link.label}
                            width={30}
                            height={20}
                            className={`$ {isActive && 'invert-white'} invert-white`}/>
                            <p className='tiny-medium text-light-2'>{link.label}</p>
                        </NavLink>
                )
               })}
    </section>
  )
}

export default BottomBar