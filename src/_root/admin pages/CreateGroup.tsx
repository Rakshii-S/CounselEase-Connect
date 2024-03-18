import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../../@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "../../../@/components/ui/form"
import { Input } from "../../../@/components/ui/input"
import { Link } from "react-router-dom"
import FileUploader from "../shared/FileUploader"

export const CreateGroupTB = z.object({
  name: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  bio: z.string().min(10).max(3000)
})

function CreateGroup() 
{
  const isLoading = false;
  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateGroupTB>>({
    resolver: zodResolver(CreateGroupTB),
    defaultValues: {
      name:"",
      file:[],
      bio:""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CreateGroupTB>) {
    console.log(values)
  }

  return (
    <div className="common-container">
      <div className="m-2 p-4 text-3xl flex flex-row">
        <img
        src="/assets/group.png"
        alt="add user"
        width={120}
        className="p-2"
        />
        <p className="p-2 mt-8">Create a group</p>
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
              <FormLabel className="m-4">Group profile</FormLabel>
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="m-4">Description</FormLabel>
              <FormControl>
                <Input  className="bg-slate-900 m-2 p-4 mb-10 rounded-xl h-24" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <center>
          <Button type="submit" className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">Create</Button>
          <Button type="submit" className="bg-sky-800 m-2 p-4 mb-10 rounded-xl w-56 h-18">Cancel</Button>
          </center>
        
      </form>
    </Form>
    </div>
  )
}

export default CreateGroup