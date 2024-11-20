import { GET_EQUIPMENTS } from "@/routes/equipments"
import { useQuery } from "@apollo/client"
import { Input } from "../ui/input";
import { useState } from "react";   

interface EquipmentListProps {
    arg: string
}

export function EquipmentSearchBar() {
    const [searchArg, setSearchArg] = useState('');

    return (
        <div>
            <Input type="search" onChange={(e) => setSearchArg(e.target.value.toLowerCase())} />
            <EquipmentList arg={searchArg} />
        </div>
    )
}

function EquipmentList ({ arg }: EquipmentListProps) {
    const { loading, data, error } = useQuery(GET_EQUIPMENTS)

    if(loading) return "Carregando..."
    if(error) return `Error: ${error.message}`

    const equipments = data['equipment']
    const filteredData = equipments.filter((el: any) => {
        
        if(arg == '') {
            return el
        } else {
            return el.name.toLowerCase().includes(arg)
        }
        
    })

    return (
        <div>
            {filteredData.map((el: any) => (
                <p key={el.id}>{el.name}</p>
            ))}
        </div>
    )

}