import Loading from "@/components/shared/Loading"
import { Button } from "@/components/ui/button"
import { getSchedules, ScheduleType } from "@/Firebase/functions"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Schedules = () => {

  const [schedules, setSchedules] = useState<ScheduleType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const storedSchedules = localStorage.getItem("schedules");
    if (storedSchedules) {
      setSchedules(JSON.parse(storedSchedules));
      setLoading(false);
      return;
    } 
    const fetchSchedules = async () => {
      setLoading(true);
      const sch = await getSchedules();
      setSchedules(sch as ScheduleType[] | []);
      setLoading(false);
    }; 
    fetchSchedules();
  }, [])

  return (
    <div>
      {loading && <Loading Message="Loading Schedules...."/>}
      {schedules.length !== 0 ? (
        <div>
          <h1 className="my-[30px] mx-[10px] text-4xl font-bold text-primary">Your Schedules</h1>
          <div className="mx-[15px] flex items-center gap-3 flex-wrap">
            {schedules.map((schedule) => (
              <Link key={schedule.id} to={`/schedule/${schedule.id}`}>
                <div className="w-[150px] sm:w-[160px] h-[100px] flex flex-col items-start justify-center border-[2px] border-primary p-2 rounded-lg shadow-xl hover:scale-110 transition-all bg-white">
                  <p className="font-bold text-sm text-secondary">Title: <span className="text-primary">{schedule.userSeletion.title}</span></p>
                  <p className="font-bold text-sm text-secondary">Days: <span className="text-primary">{schedule.userSeletion.days}</span></p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[80vh] w-full flex justify-center items-center flex-col">
          <p className="text-3xl font-bold text-primary mb-[10px]">No Schedules yet</p>
          <Link to={"/schedule/generate"}><Button className="bg-primary text-white font-bold hover:bg-primary/80 text-xl">Create Schedule</Button></Link>
        </div>
      )}
    </div>
  )
}

export default Schedules