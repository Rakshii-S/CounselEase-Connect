import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../../@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "../../../@/components/ui/form"
import { Input } from "../../../@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../../@/components/ui/use-toast"
import { Models } from "appwrite"
import { useAddCounsellor, useUpdateCounsellorC, useUpdateCounsellorU} from "../../../@/lib/react_query/queryNmutation"
import Loader from "../shared/Loader"
import { v4 } from "uuid"


//form validation by zod
export const AddCounsellorsToDB = z.object({
    name: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    email: z.string().email(),
    password: z.string().min(8),
    block:z.string().min(2),
    contact: z.string().min(10)
  })

//props
type Formprops={
  counsellorU?:Models.Document;
  counsellorC?:Models.Document;
  action:'Create' | 'Update'
}

function CounsellorForm({counsellorU,counsellorC,action}:Formprops) 
{
  console.log(counsellorC)
  console.log(counsellorU)
  //constants
  const {toast} = useToast();
  const navigate = useNavigate();

  //tanstack query, appwrite and context 
  const {mutateAsync: addCounsellor, isPending: isLoadingCreate} = useAddCounsellor();
  const {mutateAsync: updateCounsellor1, isPending: isLoadingUpdate1} = useUpdateCounsellorU();
  const {mutateAsync: updateCounsellor2, isPending: isLoadingUpdate2} = useUpdateCounsellorC();
  // const {mutateAsync: updateUserAccount, isPending: isUpdatingUser} = useUpdateUserAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof AddCounsellorsToDB>>({
    resolver: zodResolver(AddCounsellorsToDB),
    defaultValues: {
      name:"",
      email:"",
      password:"",
      block:"",
      contact:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AddCounsellorsToDB>) 
  {
    if(counsellorC && counsellorU && action=="Update")
    {
        // const newUser = await updateUserAccount({userid: counsellorU.$id});
        // if(!newUser){
        //   return toast({
        //     title: "Sign up failed. Please try again",
        //   });
        // }
        const updatedPost1 = await updateCounsellor1({
          ...values,
          $id: counsellorU.$id,
          username: "",
          bio: ""
        })
        const updatedPost2 = await updateCounsellor2({
          ...values,
          $id: counsellorC.$id,
          username: "",
          bio: ""
        })

        if(!updatedPost1 && !updatedPost2)
        {
          toast({title:'Please try again'})
        }
        return navigate(`/counsellor`)
    } 
    else
    {
        const newCounsellor = await addCounsellor({
            ...values,
            userId: v4(),
            email: values.email,
            role: "counsellor",
            username: "",
            imageUrl: [],
            bio: ""
        })

        if(!newCounsellor){
          toast({
            title:'Please try again'
          })
        }else{
          toast({
            title:'Post uploaded successfully'
          })
        }
        return navigate('/counsellor');
    }
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center">

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="m-4">Name</FormLabel>
            <FormControl>
              <Input placeholder={`${counsellorU?.name}` || " "} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
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
              <Input placeholder={`${counsellorU?.email}` || " "} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
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
              <Input  placeholder={`${counsellorC?.password}` || " "} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="block"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="m-4">Block name</FormLabel>
            <FormControl>
              <Input placeholder={`${counsellorC?.block}` || " "} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="contact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="m-4">Contact number</FormLabel>
            <FormControl>
              <Input placeholder={`${counsellorC?.contact}` || " "} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <center>
      <Button type="submit" className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">
            {isLoadingCreate || isLoadingUpdate1 || isLoadingUpdate2 ?(
              <div className="pl-10 pt-2">
                <Loader/>
              </div>
            ):(
              <p>{action} Counsellor</p>
            )}
            </Button>
        <Button onClick={()=>navigate("/counsellor")} className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">Cancel</Button>
        </center>
    </form>
  </Form>
  )
}

export default CounsellorForm