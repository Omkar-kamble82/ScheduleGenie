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
                    <SelectValue className="text-secondary" placeholder="Solo Trip..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="1 person">A Solo Trip (i.e. 1 person)</SelectItem>
                    <SelectItem value="2 people">A Couples Trip     (i.e. 1 people)</SelectItem>
                    <SelectItem value="3 to 4 people">A Family Trip (i.e. 3 - 4 people)</SelectItem>
                    <SelectItem value="5 to 10 people">A Group Trip (i.e, 5 - 10 people)</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default PeopleDropdown