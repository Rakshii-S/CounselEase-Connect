import React from 'react'
import { Button } from '../../../@/components/ui/button'
import { useNavigate } from 'react-router-dom';

function ViewBuddy() {
  const navigate = useNavigate();
  return (
    <div className='common-container'>
        <div className='bg-slate-900 w-full h-full  rounded-xl  flex flex-col'>
            <img
            src="https://i.pinimg.com/474x/60/b1/e4/60b1e4f0d521cfd16e4de3e59a263470.jpg"
            alt="profile"
            className='m-10 ml-40 w-48 rounded-full'
            />
            <div>
                <div className='flex flex-row text-xl'>
                <p className='pl-10 pt-5 pr-5'>Name:</p>
                <p className='pl-3 pt-5'>Ananaya</p>
              </div>
              <div className='flex flex-row text-xl'>
                <p className='pl-10 pt-5 pr-5'>Email:</p>
                <p className='pl-3 pt-5'>Ananaya@gmail.com</p>
              </div>
              <div className='flex flex-row text-xl'>
                <p className='pl-10 pt-5 pr-5'>Role:</p>
                <p className='pl-3 pt-5'>Buddy</p>
              </div>
              <div className='flex flex-row text-xl'>
                <p className='pl-10 pt-5 pr-5'>Bio:</p>
                <p className='pl-3 pt-5'>kwjqdg jewhgdiuew wqhgsxjh</p>
              </div>
              <div className='flex flex-row text-xl'>
                <p className='pl-10 pt-5 pr-5'>Contact:</p>
                <p className='pl-3 pt-5'>1234567890</p>
              </div>
            </div>
        </div>
        <Button onClick={()=>navigate("/buddy")} className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">Go Back</Button>
    </div>
  )
}

export default ViewBuddy