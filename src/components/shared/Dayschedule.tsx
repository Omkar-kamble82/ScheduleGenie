type Props = {
    daynumber: string,
    day: {
        afternoon: [{
            description: "",
            duration: "",
            task: ""
        }],
        morning: [{
            description: "",
            duration: "",
            task: ""
        }]
    }
}

const Dayschedule = (props:Props) => {
  return (
    <div className="bg-[#c9c9c9] shadow-2xl p-3 rounded-3xl my-[25px]">
        <h1 className="text-yellow-500 font-extrabold text-3xl p-2 bg-gray-700 rounded-xl w-fit mt-[10px]">{props.daynumber}</h1>
        { 
            props.day.morning && (
            <>
                <div className="text-yellow-800 font-bold text-xl sm:ml-[15px] mt-[10px]">Morning</div>
                {props.day.morning.map(t => (
                <div key={t.task} className="sm:ml-[30px] mt-[5px] shadow-md">
                    <p className="bg-[#eee] rounded-xl py-3 px-1 text-secondary font-bold"><span className="text-yellow-600"><span className="bg-gray-700 p-2 rounded-xl text-yellow-500">{t.duration}</span> {t.task}:</span> {t.description}</p>
                </div>
                ))}
            </>
        )}
        { 
            props.day.afternoon && (
            <>
            <div className="text-yellow-800 font-bold text-xl sm:ml-[15px] mt-[10px]">Afternoon</div>
            {props.day.afternoon.map(t => (
            <div key={t.task} className="sm:ml-[30px] mt-[5px] shadow-md">
                <p className="bg-[#eee] rounded-xl py-3 px-1 text-secondary font-bold"><span className="text-yellow-600"><span className="bg-gray-700 p-2 rounded-xl text-yellow-500">{t.duration}</span> {t.task}:</span> {t.description}</p>
            </div>
            ))}</>
        )}
    </div>
  )
}

export default Dayschedule