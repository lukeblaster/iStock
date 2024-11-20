import { DataTable } from "@/components/tables/data-table"
import { equipmentColumns } from "@/components/columns/equipment-columns"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button" 
import { AddEquipmentModal } from "@/components/modal/add-equipment-modal"
import { Plus } from "lucide-react"
import { gql, useQuery } from "@apollo/client"

export const GET_EQUIPMENTS = gql`
    query GetEquipments {
        equipment {
            id,
            name,
            quantityInStock
        }
    }
`

function DialogEquipment() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-400 ml-2 text-white">
                    <Plus /> Adicionar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Novo produto
                    </DialogTitle>
                    <DialogDescription>Adicione um novo produto</DialogDescription>
                </DialogHeader>

                {/* Componente de Dialog para adicionar novo equipamento */}
                <AddEquipmentModal />

            </DialogContent>
        </Dialog>
    )
}

export function Equipments() {
    const { loading, error, data } = useQuery(GET_EQUIPMENTS);

    if(loading) return <p>Carregando... </p>;
    if(error) return <p>Erro: {error.message}</p>;

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl font-semibold">Equipamentos</h1>
            <DataTable data={data.equipment} columns={equipmentColumns} filter="name" dialogTable={DialogEquipment()} />
        </div>
    )
}