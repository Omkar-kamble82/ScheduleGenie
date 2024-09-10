
type Props = {
    Message: string
}

const Loading = (props: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center fixed inset-0 backdrop-filter backdrop-blur-lg z-50">
        <div className="bg-[white] relative rounded-xl shadow-xl flex flex-col items-center justify-center w-72 sm:w-96 h-64">
        <img className="h-36 w-36" src="/loading.gif" alt="Loading..." />
        <p className="text-2xl text-primary font-bold">{props.Message}</p>
        </div>
    </div>
  )
}

export default Loading