import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../../@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "../../../@/components/ui/form"
import { Input } from "../../../@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../../@/components/ui/use-toast"
import { Models } from "appwrite"
import { useAddBuddy, useUpdateBuddyB, useUpdateBuddyU,useUpdateUserAccount} from "../../../@/lib/react_query/queryNmutation"
import Loader from "../shared/Loader"
import { v4 } from "uuid"


//form validation by zod
export const AddBuddyToDB = z.object({
    name: z.string().min(5).max(2200),
    file: z.custom<File[]>(),
    email: z.string().email(),
    password: z.string().min(8),
    contact: z.string().min(10)
  })

//props
type Formprops={
  buddyU?:Models.Document;
  buddyB?:Models.Document;
  action:'Create' | 'Update'
}

function BuddyForm({buddyU,buddyB,action}:Formprops) 
{
  console.log(buddyB)
  console.log(buddyU)
  //constants
  const {toast} = useToast();
  const navigate = useNavigate();

  //tanstack query, appwrite and context 
  const {mutateAsync: addBuddy, isPending: isLoadingCreate} = useAddBuddy();
  const {mutateAsync: updateBuddy1, isPending: isLoadingUpdate1} = useUpdateBuddyU();
  const {mutateAsync: updateBuddy2, isPending: isLoadingUpdate2} = useUpdateBuddyB();
  // const {mutateAsync: updateUserAccount, isPending: isUpdatingUser} = useUpdateUserAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof AddBuddyToDB>>({
    resolver: zodResolver(AddBuddyToDB),
    defaultValues: {
      name:"",
      email:"",
      password:"",
      contact:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AddBuddyToDB>) 
  {
    if(buddyB && buddyU && action=="Update")
    {
        // const newUser = await updateUserAccount({userid: buddyU.$id});
        // if(!newUser){
        //   return toast({
        //     title: "Sign up failed. Please try again",
        //   });
        // }
        const updatedPost1 = await updateBuddy1({
          ...values,
          $id: buddyU.$id,
          username: "",
          bio: ""
        })
        const updatedPost2 = await updateBuddy2({
          ...values,
          $id: buddyB.$id,
          username: "",
          bio: ""
        })

        if(!updatedPost1 && !updatedPost2)
        {
          toast({title:'Please try again'})
        }
        else{
          toast({
            title:'Buddy account updated successfully'
          })
        }
        return navigate(`/buddy`)
    } 
    else
    {
        const newCounsellor = await addBuddy({
            ...values,
            userId: v4(),
            email: values.email,
            role: "buddy",
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
            title:'Buddy account created successfully'
          })
        }
        return navigate('/buddy');
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
              <Input placeholder={`${buddyU?.name}` || " "} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
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
              <Input placeholder={`${buddyU?.email}` || " "} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
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
              <Input  placeholder={`${buddyB?.password}` || " "} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
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
              <Input placeholder={`${buddyB?.contact}` || " "} className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <center>
      <Button type="submit" className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">
            {isLoadingCreate || isLoadingUpdate1 || isLoadingUpdate2?(
              <div className="pl-10 pt-2">
                <Loader/>
              </div>
            ):(
              <p>{action} Buddy</p>
            )}
            </Button>
        <Button onClick={()=>navigate("/buddy")} className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">Cancel</Button>
        </center>
    </form>
  </Form>
  )
}

export default BuddyForm