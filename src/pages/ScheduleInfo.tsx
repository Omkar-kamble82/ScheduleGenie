import { ScheduleType } from "@/Firebase/functions"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "@/components/shared/Loading"

const ScheduleInfo = () => {

    const { id } = useParams()
    const [schedule, setSchedule] = useState<ScheduleType | null>(null)
    const [loading, setLoading] = useState(false)
    const get = async () => {
      if(id === undefined) return
      if(localStorage.getItem('schedules')){
        const schedules = JSON.parse(localStorage.getItem('schedules') as string) as ScheduleType[]
        schedules.filter(schedule => schedule.id === id)
        setSchedule(schedules[0])
      }
    }

    useEffect(() => {
      setLoading(true)
      const sch = JSON.parse(localStorage.getItem("schedule") as string) 
      if(sch !== "" && localStorage.getItem("schedule") && id === sch.id) {
        setSchedule(sch as ScheduleType)
        setLoading(false)
        return
      }
      setLoading(false)
      get()
    }, [])
    
  return (
    <div>
      {loading && <Loading Message="Loading Schedule....."/>}
      { !loading && schedule ? (
        <div className="min-h-screen bg-[#eee]">
          <img className="h-[35vh] w-full object-cover" src="/banners/2.jpg" alt="banner-img"/>
          <p>Title: {schedule.userSeletion.title}</p>
        </div>
        ) 
        : 
        (
          <div className="h-[90vh] w-screen flex justify-center items-center bg-white">
            <p className="text-primary text-3xl font-bold">No Schedule found</p>
          </div>    
      )}
    </div>
  )
}

export default ScheduleInfo