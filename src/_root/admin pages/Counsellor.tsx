import { Button } from '../../../@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useGetRecentCounsellorC, useGetRecentCounsellorU } from '../../../@/lib/react_query/queryNmutation';
import Loader from '../shared/Loader';
import { Models } from 'appwrite';
import { useUserContext } from '../../../context/AuthContext';

function Counsellor() {
  //constants
  const {user} = useUserContext();
  const navigate = useNavigate();

  //tanstack query and appwrite 
  const {data:usersU, isPending : isUserLoading1} = useGetRecentCounsellorU();
  const {data:usersC, isPending : isUserLoading2} = useGetRecentCounsellorC();

  return (
    <>
    <div className="common-container">
      {user.role == "admin"?(
          <div className='bg-gray-900 w-full h-24 text-2xl rounded-2xl p-8 pl-10 pr-10 flex flex-row justify-between'>
          <p>Add new Counsellor</p>
          <Link to="/add-counsellor">
            <img
            src="/assets/plus.png"
            width={40}
            />
          </Link>
        </div>
      ):(
        <div className='h3-bold md:h2-bold text-left w-full'>
          <p>Counsellor profiles</p>
        </div>
      )}
        {isUserLoading1 && isUserLoading2 && !usersU && !usersC?(
              <Loader/>
            ):(<ul>
              <div className=' flex flex-row flex-wrap items-center gap-5 overflow-y py-2 px-2 md:px-4 lg:p-4 '>
                  {(usersU?.documents || []).filter(userU => userU.role === "counsellor").map((userU: Models.Document, index: number) => (
                    <div key={userU.id}>
                      {usersC?.documents && index < usersC.documents.length && (
                        <>
                        <div className='lg:w-[400px] lg:h-[350px] md:w-[400px] md:h-[350px]  h-[350px] w-[400px] p-6 bg-gray-900 rounded-3xl flex flex-row m-4'>
                            <Link to={`/view-counsellor/${userU.$id}`} className='mt-8'>
                                  <img
                                    src={userU.imageUrl || `https://i.pinimg.com/474x/60/b1/e4/60b1e4f0d521cfd16e4de3e59a263470.jpg`}
                                    alt="profile"
                                    className='w-56 rounded-full'
                                    />
                            </Link>
                            <div className='mt-10'>
                                  <Button className=' ml-36 mt-[-30px]'>
                                    <img
                                    src="/assets/trash.png"
                                    width={30}
                                    alt="edit"
                                    />
                                  </Button>
                                  <Button onClick={()=>navigate(`/edit-counsellor/${userU.$id}`)} className=' ml-36'>
                                    <img
                                    src="/assets/edit.png"
                                    width={30}
                                    alt="edit"
                                    />
                                  </Button>
                                  <div className='pl-10 mt-6 text-xl'>{userU.name}</div>
                                  <div className='pl-10 mt-2 text-light text-gray-500'>{userU.role}</div>
                                  <div className='pl-8 mt-2 text-sm text-gray-500'>BLOCK: {usersC.documents[index].block}</div>
                            </div>
                      </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
              </ul>)}
    </div>
    </>
  )
}

export default Counsellor