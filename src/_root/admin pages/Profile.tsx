import { useNavigate } from 'react-router-dom';
import { Button } from '../../../@/components/ui/button';
import { useGetCurrentUser } from '../../../@/lib/react_query/queryNmutation';
import { multiFormatDateString } from '../../../@/lib/utils';
import Loader from '../shared/Loader';
import { Models } from 'appwrite';
type props=
{
    user: Models.Document;
}
function Profile() {
    const navigate = useNavigate();
    const { data:user, isLoading } = useGetCurrentUser();
    if(isLoading) return (
      <div className='m-[400px]'>
         <Loader/>
      </div>
    )
    return (
    <div  className="common-container">
        <div className='bg-slate-900 flex lg:flex-row flex-col rounded-xl w-full mt-24'>
                <center>
                <img 
                    src={user.imageUrl || ``} 
                    alt="profile" 
                    className='rounded-full w-56 h-56 m-10'
                />
                </center>
            <div className='lg:mt-20 lg:ml-28'>
                <div>
                    <p className='text-center text-light-3'>Joined: {multiFormatDateString(user.$createdAt)}</p>
                    <p className='text-center text-xl p-2'>{user.name}</p>
                    <p className='text-center text-light-3'>{user.username}</p>
                    <p  className='text-center text-light-3 p-2'>{user.email}</p>
                </div>
                <div>
                        <p className='text-center p-2 pb-20'>Bio: {user.bio}</p>
                </div>
            </div>
        </div>   
        <div className='flex lg:flex-row justify-between flex-col'>
            <Button onClick={()=>navigate("/edit-profile")} className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18 lg:hidden md:hidden visible">Edit profile</Button>
            <Button onClick={()=>navigate("/")} className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">Go Back</Button>
        </div>
    </div>
    )
}

export default Profile