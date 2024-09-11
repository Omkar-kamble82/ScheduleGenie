import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../components/ui/input"
import { ai_prompt, chatSession } from "@/Firebase/AIModel"
import { setSchedule } from "@/Firebase/functions"
import { toast } from "sonner"
import { useState } from "react"
import Loading from "@/components/shared/Loading"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"


export const formSchema = z.object({
  title: z.string().min(6, 'The title must be at least 6 characters'),
  hours: z.number().min(2, 'Min number of hours must be less than 2').max(18, 'Max number of hours must be less than 18'),
  days: z.number()
  .min(2, { message: "The minimum should be 2 days" })
  .max(10, { message: "The minimum should less than 10 days" }),
  task: z.string().min(6, 'The task must be at least 6 characters'),
})
 
const CreateSchedule = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      hours:2,
      days: 2,
      task:'',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const final_prompt = ai_prompt
    .replace('{task}',values.task)
    .replace('{days}',values.days.toString())
    .replace('{hours}',(values.hours / 2).toString())
    setLoading(true)
    try{
      const result = await chatSession.sendMessage(final_prompt)
      const id = await setSchedule(result.response.text(), values)
      setLoading(false)
      navigate(`/schedule/${id}`)
    } catch {
      toast.error("Error while generating scheduling")
    }
  }

  return (
    <div className="max-w-[850px] mx-[10px] lg:mx-auto">
      {loading && (<Loading Message="Generating Schedule...."/>)}
      <h1 className="text-4xl my-[25px] text-center font-bold text-secondary">Generate Schedule</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold text-secondary">Enter a title for the task</FormLabel>
                <FormControl>
                  <Input placeholder="Todo app" {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="days"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold text-secondary">Enter the number of days you would like to work on this task <span className="text-[12px] font-semibold">(2 - 10 days)</span></FormLabel>
                <FormControl>
                  <Input type="number" min={2} max={10} placeholder="2" {...field} onChange={event => field.onChange(+event.target.value)}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold text-secondary">Enter the amount of hours you can put in daily <span className="text-[12px] font-semibold">(2 - 18 hours)</span></FormLabel>
                <FormControl>
                  <Input type="number" min={2} max={10} placeholder="2" {...field} onChange={event => field.onChange(+event.target.value)}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold text-secondary">Enter the task you want to achieve <span className="text-[12px] font-semibold">(Explain in detail)</span></FormLabel>
                <FormControl>
                  <Textarea  placeholder="Create a todo app using react...." {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="bg-primary text-white hover:bg-primary hover:opacity-70 text-lg py-[10px] disabled:opacity-50" type="submit">Generate Schedule</Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateSchedule