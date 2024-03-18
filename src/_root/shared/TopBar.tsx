import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../../@/components/ui/button';

function TopBar() {
// const {mutate: signOut, isSuccess} = useSignOutAccout();
const navigate = useNavigate();
// const {user} = useUserContext();

// useEffect(()=>{
//     if(isSuccess) navigate(0);
// },[isSuccess])

  return (
    <section className='topbar'>
        <div className='flex-between py-4 px-5'>
            <Link to="/" className='flex gap-3 items-center'>
            <img 
                    src="/assets/mind.png"
                    alt="logo"
                    width={50}
                />
            </Link>
            <div className='flex gap-4'>
                <Button variant="ghost" className='shad-button_ghost'>
                    <img 
                    src="/assets/exit.png" 
                    width={30}
                    alt="logout"/>
                </Button>
                <Link to="" className='flex-center gap-3'>
                    <img 
                    src='https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1710547200&semt=ais'
                alt="profile"
                className='h-10 w-10 rounded-full'
                    />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default TopBar