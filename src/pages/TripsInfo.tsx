import { useParams } from "react-router-dom"
// type Props = {}
// props: Props
const TripsInfo = () => {
    const { id } = useParams()
  return (
    <div>Trip: {id}</div>
  )
}

export default TripsInfo