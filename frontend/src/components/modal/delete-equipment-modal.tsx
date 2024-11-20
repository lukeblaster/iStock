import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../ui/dialog"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { useMutation } from "@apollo/client"
import { gql } from "@apollo/client"
import { GET_EQUIPMENTS } from "@/routes/equipments"

const DELETE_EQUIPMENT = gql`
    mutation deleteEquipment($id: Int!) {
        deleteEquipment(id: $id) {
            name,
            quantityInStock
        }
    }
`

export function DeleteEquipmentModal({ id }: { id: number }) {
    const [deleteEquipment] = useMutation(DELETE_EQUIPMENT, {
        refetchQueries: [
            GET_EQUIPMENTS,
            'getEquipments'
        ]
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="hover:bg-neutral-200 cursor-pointer" variant={"ghost"}><Trash2 /> Deletar equipamento</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Excluir equipamento?</DialogTitle>
                    <DialogDescription>Esta ação não pode ser revertida</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={"outline"}>Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button 
                            variant={"destructive"}
                            onClick={() => deleteEquipment({ variables: { id: +id } })}
                        >Excluir</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}