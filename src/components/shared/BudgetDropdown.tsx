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
                    <SelectValue className="text-secondary" placeholder="A Budget Trip (i.e upto 1000$)..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="0 - 1000$">A Budget Trip (i.e upto 1000$)</SelectItem>
                    <SelectItem value="1000$ - 2500$">A Grand Trip (i.e 1000 - 2500$)</SelectItem>
                    <SelectItem value="2500$+">A Luxury Trip (i.e 2500$ + )</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default Dropdown