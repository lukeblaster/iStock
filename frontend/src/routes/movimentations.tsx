import { DataTable } from "@/components/tables/data-table";
import { movementColumns } from "@/components/columns/movement-columns";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddMovementModal } from "@/components/modal/add-movement-modal";
import { gql, useQuery } from "@apollo/client";

export const GET_MOVIMENTATIONS = gql`
    query GetMovimentations {
        movimentation {
            id
            amount
            status
            movementType
            equipment {
                id,
                name,
                quantityInStock
            }
        }
    }
`

function DialogMovement() {
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
                        Nova movimentação
                    </DialogTitle>
                    <DialogDescription>Adicione uma nova entrada ou saída</DialogDescription>
                </DialogHeader>

                {/* Componente de Dialog para adicionar novo equipamento */}
                <AddMovementModal />

            </DialogContent>
        </Dialog>
    )
}

export function Movimentations() {
    const { loading, error, data } = useQuery(GET_MOVIMENTATIONS);

    if(loading) return <p>Carregando... </p>;
    if(error) return <p>Erro: {error.message}</p>;

    console.log(data)

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-xl font-semibold">Movimentações</h1>
            <DataTable data={data.movimentation} columns={movementColumns} filter="equipment" dialogTable={DialogMovement()} />
        </div>
    )
}