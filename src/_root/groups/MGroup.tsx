import { useNavigate } from "react-router-dom";
import { Button } from "../../../@/components/ui/button"
import { useGetRecentGroup } from "../../../@/lib/react_query/queryNmutation";
import Loader from "../shared/Loader";
import { Models } from "appwrite";

function MGroup() {
  const navigate = useNavigate();

  //tanstack query and appwrite 
  const {data:groups, isPending : isGroupLoading} = useGetRecentGroup();

  return (
    <>
    <div className="w-full bg-gray-950 ">
        <div className="w-full bg-gray-900 flex flex-row justify-around">
          <Button className="mt-16 ml-24 mr-24 mb-10 h-16 p-4 rounded-xl bg-black hover:bg-slate-800">
            Groups
          </Button>
          <Button className="mt-16 ml-24 mr-24 mb-10 h-16 p-4 rounded-xl bg-black hover:bg-slate-800">
            Joined Groups
          </Button>
        </div>
        <div className="h-1 bg-black"></div>
        <div className="flex flex-1 flex-col items-center mt-10">
        {isGroupLoading && !groups?(
              <Loader/>
            ):(<ul className="flex flex-1 flex-col gap-9 w-full">
                  {groups?.documents.map((group: Models.Document) => (
                    <div className='bg-gray-900 ml-4 mr-4 w-auto h-44 rounded-3xl flex flex-row justify-between'>
                    <div className='p-8 text flex flex-row'>
                        <img
                            src={group.imageUrl || `https://i.pinimg.com/474x/60/b1/e4/60b1e4f0d521cfd16e4de3e59a263470.jpg`}
                            alt="group"
                            className='rounded-full w-20 h-20'
                        />
                        <p className='p-10'>{group.name}</p>
                    </div>
                    <div className='p-10'>
                        <Button onClick={()=>navigate(`/view-group/${group.$id}`)} className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-32 h-20">View</Button>
                    </div>
                </div>
                  ))}
              </ul>
              )
    }
        </div>
    </div>
    </>
  )
}

export default MGroup