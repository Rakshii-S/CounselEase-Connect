import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../../@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "../../../@/components/ui/form"
import { Input } from "../../../@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import FileUploader from "../shared/FileUploader"

export const AddBuddyToDB = z.object({
  name: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  email: z.string().email(),
  password: z.string().min(8),
  contact: z.string().min(10)
})

function AddBuddy() 
{
  const navigate = useNavigate();
  const isLoading = false;
  // 1. Define your form.
  const form = useForm<z.infer<typeof AddBuddyToDB>>({
    resolver: zodResolver(AddBuddyToDB),
    defaultValues: {
      name:"",
      file:[],
      email:"",
      password:"",
      contact:""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof AddBuddyToDB>) {
    console.log(values)
  }

  return (
    <div className="common-container">
      <div className="m-2 p-4 mb-10 text-3xl flex flex-row">
        <img
        src="/assets/add-user.png"
        alt="add user"
        width={80}
        className="p-2"
        />
        <p className="p-2 mt-4">Add Buddy</p>
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-4">Name</FormLabel>
              <FormControl>
                <Input placeholder="name" className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
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
              <FormLabel className="m-4">Profile picture</FormLabel>
              <FormControl>
                <FileUploader
                fieldChange={field.onChange}
                mediaUrl=""/>
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
                <Input placeholder="abc@gmail.com" className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
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
                <Input  className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
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
                <Input  className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <center>
          <Button type="submit" className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">Add user</Button>
          <Button onClick={()=>navigate("/buddy")}  className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">Cancel</Button>
          </center>
        
      </form>
    </Form>
    </div>
  )
}

export default AddBuddy