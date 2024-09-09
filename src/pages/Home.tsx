import { Button } from '@/components/ui/button'
import { Login } from '@/Firebase/functions'

const Home = () => {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center text-center">
      <span className="mx-[6px] max-w-[840px] lg:mx-auto flex flex-col items-center justify-center">
        <img className="h-[240px] sm:h-[340px] xl:h-[240px]" src="/banner.png" alt="banner-img" />
        <h1 className="font-bold text-xl sm:text-3xl text-secondary"><span className="text-primary text-2xl sm:text-4xl">Tripmate:</span> Your Ultimate AI-Powered Travel Planner for Personalized, Budget-Friendly Itineraries</h1>
        <p className="text-[12px] sm:text-sm mt-[15px] text-secondary">Plan your perfect getaway with Tripmate, an AI-powered travel planner built on Google Gemina. Tailor your trips effortlessly based on your preferences, budget, and the number of days. Let Tripmate create personalized itineraries that ensure you make the most of your journey, no matter where you're headed.</p>
        <Button onClick={Login} className="bg-primary text-white font-bold hover:bg-primary/80 mt-[15px]">Get started</Button>
      </span>
    </div>
  )
}

export default Home