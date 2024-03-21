import { Button } from '../../../@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'

function Group() {
  const navigate = useNavigate();
  return (
    <>
    <div className='common-container'>
    <div className='bg-gray-900 w-full h-28 text-2xl rounded-2xl p-8 pl-10 pr-10 flex flex-row justify-between'>
      <p>Create a group</p>
      <Link to="/create-group">
        <img
        src="/assets/plus.png"
        width={60}
        className='mt-[-15px]'
        />
      </Link>
    </div>
    <div className='bg-gray-900 m-5 w-full h-44 rounded-3xl flex flex-row justify-between'>
        <div className='p-8 text-xl flex flex-row'>
            <img
                src="https://i.pinimg.com/474x/60/b1/e4/60b1e4f0d521cfd16e4de3e59a263470.jpg"
                alt="group"
                width={120}
                className='rounded-full'
            />
            <p className='p-10'>Group name</p>
        </div>
        <div className='p-10'>
            <Button onClick={()=>navigate("/view-group")} className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-32 h-20">View</Button>
        </div>
    </div>
    </div>
    </>
  )
}

export default Group