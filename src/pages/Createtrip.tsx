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
import Dropdown from "../components/shared/BudgetDropdown"
import PeopleDropdown from "@/components/shared/PeopleDropdown"
import { ai_prompt, chatSession } from "@/Firebase/AIModel"
import { setTrip } from "@/Firebase/functions"
import { toast } from "sonner"
import { useState } from "react"
import Loading from "@/components/shared/Loading"

export const formSchema = z.object({
  location: z.string().min(1, 'Location must be provided'),
  days: z.number()
  .min(1, { message: "The trip duration must be between 2 - 5 days" })
  .max(5, { message: "The trip duration must be between 2 - 5 days" }),
  people: z.string().min(1, 'No of people must be provided'),
  budget: z.string().min(1, 'Category must be selected'),
})
 
// type Props = {}

const Createtrip = () => {

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location:'',
      days: 2,
      people:'',
      budget: ''
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const final_prompt = ai_prompt
    .replace('{location}',values.location)
    .replace('{days}',values.days.toString())
    .replace('{people}',values.people)
    .replace('{budget}',values.budget)
    .replace('{days}',values.days.toString())
    console.log(final_prompt)
    setLoading(true)
    try{
      const result = await chatSession.sendMessage(final_prompt)
      await setTrip(result.response.text(), values)
      setLoading(false)
    } catch {
      toast.error("Error while generating itinerary")
    }
  }

  return (
    <div className="max-w-[850px] mx-[10px] lg:mx-auto">
      {loading && (<Loading Message="Generating Itinerary...."/>)}
      <h1 className="text-4xl my-[25px] text-center font-bold text-secondary">Generate Itinerary</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold text-secondary">Enter your destination</FormLabel>
                <FormControl>
                  <Input placeholder="Mumbai" {...field} />
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
                <FormLabel className="text-xl font-semibold text-secondary">Duration of the trip <span className="text-xs">(The trip duration must be between 2 - 6 days)</span></FormLabel>
                <FormControl>
                  <Input type="number" min={2} max={5} placeholder="2..." {...field} onChange={event => field.onChange(+event.target.value)}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
              <FormItem className="w-full">
                  <FormLabel className="text-xl font-semibold text-secondary">Choose package based on your budget</FormLabel>
                  <FormControl>
                      <Dropdown onChangeHandler={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="people"
              render={({ field }) => (
              <FormItem className="w-full">
                  <FormLabel className="text-xl font-semibold text-secondary">Who are you travelling with</FormLabel>
                  <FormControl>
                      <PeopleDropdown onChangeHandler={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
              )}
          />
          <div className="flex justify-end">
            <Button disabled={loading} className="bg-primary text-white hover:bg-primary hover:opacity-70 text-lg py-[10px] disabled:opacity-50" type="submit">Generate Itinerary</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Createtrip