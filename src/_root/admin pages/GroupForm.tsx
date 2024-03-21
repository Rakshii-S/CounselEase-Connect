import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import { z } from "zod";
import { useUserContext } from "../../../context/AuthContext";
import { useToast } from "../../../@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../@/components/ui/form";
import { Input } from "../../../@/components/ui/input";
import FileUploader from "../shared/FileUploader";
import { Button } from "../../../@/components/ui/button";
import Loader from "../shared/Loader";
import { useCreateGroup, useUpdateGroup } from "../../../@/lib/react_query/queryNmutation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { useForm } from "react-hook-form";


//form validation by zod
export const AddGroupToDB = z.object({
    name: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    bio: z.string().min(5).max(3000),
    counsellorId:z.string().min(5).max(3000),
    buddyId : z.string().min(5).max(2240)
  })

//props
type GroupForm={
    group?:Models.Document;
    action:'Create' | 'Update'
  }
  
  function GroupForm({group,action}:GroupForm) 
  {
    //constants
  const {toast} = useToast();
  const navigate = useNavigate();

  //tanstack query, appwrite and context 
  const {user} = useUserContext();
  const {mutateAsync: createGroup, isPending: isLoadingCreate} = useCreateGroup();
  const {mutateAsync: updateGroup, isPending: isLoadingUpdate} = useUpdateGroup();

  // 1. Define your form.
  const form = useForm<z.infer<typeof AddGroupToDB>>({
    resolver: zodResolver(AddGroupToDB),
    defaultValues: {
      name:"",
      file:[],
      bio:"",
      counsellorId:"",
      buddyId:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AddGroupToDB>) 
  {
    if(group && action=="Update")
    {
        const updatedPost = await updateGroup({
          ...values,
          groupId: group.$id,
          imageId: group?.imageId,
          imageUrl: group?.imageUrl,
        })
        if(!updatedPost)
        {
          toast({title:'Please try again'})
        }
        return navigate(`/`)
    } 
    else
    {
        const newPost = await createGroup({
          ...values,
          userId: user.id,
        })

        if(!newPost){
          toast({
            title:'Please try again'
          })
        }else{
          toast({
            title:'Group created successfully'
          })
        }
        return navigate('/');
    }
 }
    return (
      <div>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-4">Group name</FormLabel>
              <FormControl>
                <Input placeholder={group?.name || 'name'} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-4">Add profile</FormLabel>
              <FormControl>
                <FileUploader
                fieldChange={field.onChange}
                mediaUrl={group?.imageUrl}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-4">Description</FormLabel>
              <FormControl>
                <Input placeholder={group?.bio || `about the group`} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Select onValueChange={group?.onChange} defaultValue={group?.value} name="counsellorId">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
        </Select>

        <Select onValueChange={group?.onChange} defaultValue={group?.value} name="buddyId">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
        </Select>

       <center>
          <Button type="submit" className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">
            {isLoadingCreate || isLoadingUpdate?(
              <div className="pl-10 pt-2">
                <Loader/>
              </div>
            ):(
              <p>{action} Post</p>
            )}
            </Button>
          <Button type="button" onClick={()=>navigate('/')}  className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">Cancel</Button>
          </center>
      </form>
    </Form>
      </div>
    )
  }
  
  export default GroupForm