import { Link, useNavigate, useParams } from "react-router-dom"
import { useGetGroupById } from "../../../@/lib/react_query/queryNmutation";
import { useUserContext } from "../../../context/AuthContext";
import Loader from "../shared/Loader";
import { multiFormatDateString } from "../../../@/lib/utils";
import { Button } from "../../../@/components/ui/button";
import { deleteGroupById } from "../../../@/lib/appwrite/api";
import { Models } from "appwrite";


function ViewGroup() {
  const navigate = useNavigate();

  const {id} = useParams()
    const {data: group, isPending} = useGetGroupById(id || '');
    
    function deleteGroup()
    {
        deleteGroupById(id)
        navigate('/groups')
    }
    return (
      <div className="post_details-container">
        {isPending?<Loader/>:(
          <div className="bg-dark-2 w-full max-w-5xl rounded-[30px] flex-col flex xl:flex-row border border-dark-4 xl:rounded-l-[24px]">
              <div className="m-10">
                <div className="flex flex-row mb-10 justify-between">
                    <div onClick={deleteGroup}>
                      <img
                      src="/assets/trash.png"
                      alt=""
                      width={30}
                      />
                    </div>
                    <div onClick={()=>navigate(`/edit-group/${id}`)}>
                      <img
                      src="/assets/edit.png"
                      alt=""
                      width={25}
                      />
                    </div>
                </div>
                
                <div className="flex flex-col justify-center">
                    <div className="mb-8 h-10 text-center text-2xl ">
                        {group?.name}
                    </div>
                    <center>
                    <img
                      src={group?.imageUrl || `https://img.freepik.com/premium-photo/minimal-japanese-kawaii-dog-boy-chibi-anime-vector-art-sticker-with-clean-bold-line-cute-simple_655090-47243.jpg`}
                      className="rounded-full w-56 h-56"
                      alt="group profile"
                      />
                    </center>
                    <div className="mt-8 h-10 text-center text-lg">
                      {group?.bio}
                    </div>
                </div>
                <div className="flex flex-row justify-center">
                    <div className="mt-20 flex flex-row">
                      <img
                        src="/assets/counsellor.png"
                        alt="counsellor"
                        width={25}
                      />
                      <p className="ml-4"> {group?.counsellorId}</p>
                    </div>
                    <div className="mt-20 ml-10 flex flex-row">
                      <img
                        src="/assets/buddy.png"
                        alt="counsellor"
                        width={25}
                      />
                      <p className="ml-4"> {group?.buddyId}</p>
                    </div>
                </div>
              </div>

              <div className="m-4">
                all the group postssss
              </div>
          </div>
        )}
      </div>
    )
}

export default ViewGroup