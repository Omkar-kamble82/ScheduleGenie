import { DeleteSchedule, ScheduleType } from "@/Firebase/functions"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "@/components/shared/Loading"
import Dayschedule from "@/components/shared/Dayschedule"
import { Button } from "@/components/ui/button"
import { CircleX, Trash } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ScheduleInfo = () => {

    const { id } = useParams()
    const [schedule, setSchedule] = useState<ScheduleType | null>(null)
    const [loading, setLoading] = useState(false)
    const [deleteloading, setDeleteLoading] = useState(false)
    const [deletemodel, setDeleteModel] = useState(false)
    const navigate = useNavigate()

    const get = async () => {
      if(id === undefined) return
      const schedules = JSON.parse(localStorage.getItem('schedules') as string) as ScheduleType[]
      const s = schedules.filter(schedule => schedule.id === id)
      setSchedule(s[0])
    }

    const deletesched = async (id: string) => {
      try {
        setDeleteModel(false)
        setDeleteLoading(true)
        await DeleteSchedule(id)
        setDeleteLoading(false)
        navigate("/schedules")
      } catch {
        console.log("Error deleting schedule")
      }
    }

    useEffect(() => {
      setLoading(true)
      get()
      setLoading(false)
    }, [])
  return (
    <div>
      {loading && <Loading Message="Loading Schedule....."/>}
      {deleteloading && <Loading Message="Deleting Schedule....."/>}
      {schedule && deletemodel && (
        <div className="h-full w-full flex items-center justify-center fixed inset-0 backdrop-filter backdrop-blur-lg z-50">
          <div className="bg-[white] relative rounded-xl shadow-xl flex flex-col justify-center items-center px-5 w-88 sm:w-96 h-40">
              <button className="absolute text-red-600 top-2.5 right-2.5" onClick={() => setDeleteModel(false)}>
                  <CircleX />
              </button>
              <div className="flex justify-center items-center flex-col">
                  <h1 className="text-xl text-center font-bold text-red-600">Confirm Delete {schedule.userSeletion.title} </h1>
                  <Button onClick={() => deletesched(schedule.id)} className="bg-rose-500 hover:bg-rose-500 hover:opacity-50 text-white">Confirm Delete</Button>
                </div>
          </div>
      </div>
      ) }
      { !loading && schedule ? (
        <div className="min-h-screen bg-white">
          <img className="h-[35vh] w-full object-cover" src={`/banners/${Math.floor(Math.random() * 7) + 1}.jpg`} alt="banner-img"/>
          <div className="p-[15px]">
            <p className="text-5xl mb-[10px] font-bold text-secondary">{schedule.userSeletion.title}</p>
            <div className="flex items-center justify-between mx-[15px]">
                <div className="flex gap-2 items-center">
                  <span className="text-primary p-2 bg-secondary font-bold rounded-lg">{schedule.userSeletion.hours} hours</span>
                  <span className="text-primary p-2 bg-secondary font-bold rounded-lg">{schedule.userSeletion.days} days</span>
                </div>
                <Button onClick={() => setDeleteModel(true)} className="bg-rose-500 hover:bg-rose-500 hover:opacity-50 text-white"><Trash/></Button>
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