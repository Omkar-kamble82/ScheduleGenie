import { ScheduleType } from "@/Firebase/functions"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "@/components/shared/Loading"
import Dayschedule from "@/components/shared/Dayschedule"

const ScheduleInfo = () => {

    const { id } = useParams()
    const [schedule, setSchedule] = useState<ScheduleType | null>(null)
    const [loading, setLoading] = useState(false)
    const get = async () => {
      if(id === undefined) return
      const schedules = JSON.parse(localStorage.getItem('schedules') as string) as ScheduleType[]
      const s = schedules.filter(schedule => schedule.id === id)
      setSchedule(s[0])
    }

    useEffect(() => {
      setLoading(true)
      get()
      setLoading(false)
    }, [])
  return (
    <div>
      {loading && <Loading Message="Loading Schedule....."/>}
      { !loading && schedule ? (
        <div className="min-h-screen bg-white">
          <img className="h-[35vh] w-full object-cover" src={`/banners/${Math.floor(Math.random() * 7) + 1}.jpg`} alt="banner-img"/>
          <div className="p-[15px]">
            <p className="text-5xl mb-[10px] font-bold text-secondary">{schedule.userSeletion.title}</p>
            <div className="flex gap-2 items-center">
              <span className="text-primary p-2 bg-secondary font-bold rounded-lg">{schedule.userSeletion.hours} hours</span>
              <span className="text-primary p-2 bg-secondary font-bold rounded-lg">{schedule.userSeletion.days} days</span>
            </div>
            {schedule.scheduledata.day1 && (<Dayschedule day={schedule.scheduledata.day1} daynumber="Day 1"/>)}
            {schedule.scheduledata.day2 && (<Dayschedule day={schedule.scheduledata.day2} daynumber="Day 2"/>)}
            {schedule.scheduledata.day3 && (<Dayschedule day={schedule.scheduledata.day3} daynumber="Day 3"/>)}
            {schedule.scheduledata.day4 && (<Dayschedule day={schedule.scheduledata.day4} daynumber="Day 4"/>)}
            {schedule.scheduledata.day5 && (<Dayschedule day={schedule.scheduledata.day5} daynumber="Day 5"/>)}
            {schedule.scheduledata.day6 && (<Dayschedule day={schedule.scheduledata.day6} daynumber="Day 6"/>)}
            {schedule.scheduledata.day7 && (<Dayschedule day={schedule.scheduledata.day7} daynumber="Day 7"/>)}
            {schedule.scheduledata.day8 && (<Dayschedule day={schedule.scheduledata.day8} daynumber="Day 8"/>)}
            {schedule.scheduledata.day9 && (<Dayschedule day={schedule.scheduledata.day9} daynumber="Day 9"/>)}
            {schedule.scheduledata.day10 && (<Dayschedule day={schedule.scheduledata.day10} daynumber="Day 10"/>)}
          </div>
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