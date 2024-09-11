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

const PeopleDropdown = (props: Props) => {
    return (
        <div className="relative z-[3]">
            <Select onValueChange={props.onChangeHandler} defaultValue={props.value}>
                <SelectTrigger className="">
                    <SelectValue className="text-secondary placeholder-secondary" placeholder="A Solo Trip" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Solo person">A Solo Trip</SelectItem>
                    <SelectItem value="Couple">A Couples Trip</SelectItem>
                    <SelectItem value="Family">A Family Trip</SelectItem>
                    <SelectItem value="Friends">A Friends Trip</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default PeopleDropdown