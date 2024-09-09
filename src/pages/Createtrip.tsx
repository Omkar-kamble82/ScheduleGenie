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

const formSchema = z.object({
  location: z.string().min(1, 'Location must be provided'),
  days: z.number()
  .min(1, { message: "The trip duration must be between 2 - 6 days" })
  .max(6, { message: "The trip duration must be between 2 - 6 days" }),
  people: z.string().min(1, 'No of people must be provided'),
  budget: z.string().min(1, 'Category must be selected'),
})
 
// type Props = {}

const Createtrip = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location:'',
      days: 3,
      people:'',
      budget: ''
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="max-w-[850px] mx-[10px] lg:mx-auto">
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
                  <Input placeholder="Mumbai, Maharashtra...." {...field} />
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
                  <Input type="number" min={2} max={6} placeholder="2..." {...field} onChange={event => field.onChange(+event.target.value)}/>
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
                  <FormLabel className="text-xl font-semibold text-secondary">Choose the number of people on the trip</FormLabel>
                  <FormControl>
                      <PeopleDropdown onChangeHandler={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
              </FormItem>
              )}
          />
          <Button className="w-full bg-primary text-white hover:bg-primary hover:opacity-70 text-lg py-[10px]" type="submit">Generate Itinerary</Button>
        </form>
      </Form>
    </div>
  )
}

export default Createtrip