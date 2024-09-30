import { Button } from '@/components/ui/button'
import { Login } from '@/Firebase/functions'

const Home = () => {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center text-center">
      <span className="mx-[6px] max-w-[840px] lg:mx-auto flex flex-col items-center justify-center">
        <img className="h-[240px] sm:h-[340px] xl:h-[240px]" src="/banner.jpeg" alt="banner-img" />
        <h1 className="font-bold text-xl sm:text-3xl text-secondary"><span className="text-primary text-2xl sm:text-4xl">Schedulegenie:</span> Your AI-Powered Timetable Creator for Personalized Daily Planning</h1>
        <p className="text-[12px] sm:text-sm mt-[15px] text-secondary">Simplify your daily planning with Schedulegenie, an AI-driven timetable generator powered by Gemine AI. Input your task descriptions, desired work duration, and daily working hours, and let Schedulegenie craft a personalized, efficient schedule tailored to your needs. Maximize productivity with AI-generated timetables that adapt to your workload and time preferences.</p>
        <Button onClick={Login} className="bg-primary text-white font-bold hover:bg-primary/80 mt-[15px]">Get started</Button>
      </span>
    </div>
  )
}

export default Home
