import { CircleArrowLeft } from 'lucide-react'

const Notfound = () => {
  return (
    <div className="h-[91vh] w-screen flex justify-center items-center bg-white">
        <div className="flex justify-center flex-col items-center h-[400px] w-[400px] px-[10px]">
            <img className='h-[500px] w-[500px] object-cover' src="/not-found.jpg" alt="not-found-gif"/>
            <p className='mt-[15px] text-xl text-secondary font-bold text-center'>Look's like you are lost click below button to return back to home!</p>
            <a href="/schedules" className="rounded-md mt-[15px] flex gap-1 items-center text-[white] bg-primary px-6 py-2.5 text-lg font-semibold hover:opacity-90 transition-all hover:duration-700">
                <span><CircleArrowLeft /></span>Reture back to Homepage
            </a>
        </div>           
    </div>
  )
}

export default Notfound