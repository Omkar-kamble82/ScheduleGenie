import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    value: string
    onChangeHandler?: () => void
}

const Dropdown = (props: Props) => {
    return (
        <div className="relative z-[3]">
            <Select onValueChange={props.onChangeHandler} defaultValue={props.value}>
                <SelectTrigger className="">
                    <SelectValue className="text-secondary" placeholder="A Budget Trip" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Cheap Budget">A Budget Trip</SelectItem>
                    <SelectItem value="Medium Budget">A Grand Trip</SelectItem>
                    <SelectItem value="High Budget">A Luxury Trip</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Dropdown