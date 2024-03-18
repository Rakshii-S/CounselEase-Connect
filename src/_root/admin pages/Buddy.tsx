import React from 'react'
import { Button } from '../../../@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'

function Buddy() {
  const navigate = useNavigate();
  return (
    <>
  <div className="flex flex-wrap lg:flex-row lg:flex-wrap md:flex-row md:flex-wrap flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
  <div className='bg-gray-900 w-full h-24 text-2xl rounded-2xl p-8 pl-10 pr-10 flex flex-row justify-between'>
    <p>Add new Buddy</p>
    <Link to="/add-buddy">
      <img
      src="/assets/add-user.png"
      width={30}
      />
  </Link>
  </div>
      <div className='lg:w-[400px] lg:h-[350px] md:w-[400px] md:h-[350px]  h-[350px] w-[400px] p-6  bg-gray-900 rounded-3xl flex flex-row m-10'>
         <Link to="/view-buddies" className='mt-8'>
          <img
            src="https://i.pinimg.com/474x/60/b1/e4/60b1e4f0d521cfd16e4de3e59a263470.jpg"
            alt="profile"
            width={'500px'}
            height={'500px'}
            className='rounded-2xl'
            />
         </Link>
          <div className='mt-10'>
          <Button className=' ml-24 mt-[-30px]'>
              <img
              src="/assets/trash.png"
              width={30}
              alt="edit"
              />
            </Button>
            <Button onClick={()=>navigate("/edit-buddy")} className=' ml-24'>
              <img
              src="/assets/pen.png"
              width={30}
              alt="edit"
              />
            </Button>
            <div className='pl-10 mt-6 text-xl'>Shruthi</div>
            <div className='pl-12 mt-2 text-light text-gray-500'>Buddy</div>
          </div>
      </div>
  </div>
  </>
  )
}

export default Buddy