import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../shared/Loader';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../@/components/ui/form';
import { Input } from '../../../@/components/ui/input';
import FileUploader from '../shared/FileUploader';
import { Button } from '../../../@/components/ui/button';
import { z } from 'zod';
import { useToast } from '../../../@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetCurrentUser, useUpdateAccount } from '../../../@/lib/react_query/queryNmutation';

//form validation by zod
export const AddUserToDB = z.object({
  name: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  bio: z.string().min(5).max(3000),
  password:z.string().min(5).max(100),
  username:z.string().min(5).max(3000),
  email: z.string().email()
})

function EditProfile() {
   //constants
   const {toast} = useToast();
   const navigate = useNavigate();
 
   //tanstack query, appwrite and context 
   const { data:user, isLoading: isUser } = useGetCurrentUser();
   const {mutateAsync: updateAccount, isPending: isLoadingUpdate} = useUpdateAccount();
 
   // 1. Define your form.
   const form = useForm<z.infer<typeof AddUserToDB>>({
     resolver: zodResolver(AddUserToDB),
     defaultValues: {
       name:"",
       username:"",
       file:[],
       bio:"",
       email:"",
       password:"",
     },
   })
  
   // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof AddUserToDB>) 
   {
         const updatedPost = await updateAccount({
           ...values,
           $id: user?.$id,
           userId: user.$id,
           role: user?.role,
           imageId: user?.imageId,
           imageUrl: user?.imageUrl
         })
         if(!updatedPost)
         {
           toast({title:'Please try again'})
         }
         return navigate(`/profile`)
  }

  if(isUser) return (
    <div className='m-[400px]'>
       <Loader/>
    </div>
  )
  return (
    <div  className="common-container">
        <div className="flex h-18">
            <img
            src="/assets/plus.png"
            alt="add user"
            width={80}
            className="pr-2"
            />
            <p className="p-2 mt-4 text-xl">Update profile</p>
        </div>
        <div>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-4">Name</FormLabel>
              <FormControl>
                <Input placeholder={user?.name || 'name'} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-4">Username</FormLabel>
              <FormControl>
                <Input placeholder={user?.username || 'username'} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
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
              <FormLabel className="m-4">Profile</FormLabel>
              <FormControl>
                <FileUploader
                fieldChange={field.onChange}
                mediaUrl={user?.imageUrl}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-4">Email</FormLabel>
              <FormControl>
                <Input placeholder={user?.email || 'username'} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-4">Password</FormLabel>
              <FormControl>
                <Input placeholder={user?.password || ' '} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
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
              <FormLabel className="m-4">Bio</FormLabel>
              <FormControl>
                <Input placeholder={user?.bio || `about the group`} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       <center>
          <Button type="submit" className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">
            {isLoadingUpdate?(
              <div className="pl-6">
                <Loader/>
              </div>
            ):(
              <p>Edit Profile</p>
            )}
            </Button>
          <Button type="button" onClick={()=>navigate('/profile')}  className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">Cancel</Button>
          </center>
      </form>
      </Form>
      </div>
  </div>
  )
}

export default EditProfile