import {Outlet, Navigate} from 'react-router-dom';
import { Toaster } from '../../@/components/ui/toaster';

function AuthLayout() {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated? (
        <Navigate to="/"/>
      ):(
        <>
        <section className='flex flex-1 justify-center items-center flex-col py-10'>
          <Outlet/>
          <Toaster/>
        </section>
        <img 
        src="/assets/banner.jpg"
        alt="logo"
        className='hidden xl:block h-full w-1/2 object-cover justify-end'
        />
        </>
      )}
    </>
  )
}

export default AuthLayout