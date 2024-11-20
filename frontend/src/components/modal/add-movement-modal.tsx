import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "../ui/button"
import { DialogFooter, DialogClose } from "../ui/dialog"
import { gql, useMutation, useQuery } from "@apollo/client"
import { GET_MOVIMENTATIONS } from "@/routes/movimentations"
import { GET_EQUIPMENTS } from "@/routes/equipments"
import { Equipment } from "../columns/equipment-columns"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { useState } from "react"
interface IFormInput {
    amount: number
    movementType: "entrada" | "saída",
    equipment: number
}

const CREATE_MOVIMENTATION = gql`
    mutation CreateMovimentation($amount: Int!, $status: String!, $movementType: String!, $equipmentId: Int!) {
        createMovimentation(amount: $amount, status: $status, movementType: $movementType, equipmentId: $equipmentId) {
            amount,
            status,
            movementType,
            equipment {
                id
                name
                quantityInStock
            }
        }
    }
`

export function AddMovementModal() {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm<IFormInput>();
    const [open, setOpen] = useState(false);
    const [selectedEquipmentId, setSelectedEquipmentId] = useState<number>()
    const { loading, data, error } = useQuery(GET_EQUIPMENTS)
    const [createMovimentation] = useMutation(CREATE_MOVIMENTATION, {
        refetchQueries: [
            GET_MOVIMENTATIONS,
            'GetMovimentations'
        ]
    })
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        createMovimentation({
            variables: {
                amount: +data.amount,
                status: "concluído",
                movementType: data.movementType,
                equipmentId: data.equipment
            }
        })
        console.log(data)
    }
    
    if(loading) return "Carregando..."
    if(error) return `Error: ${error.message}`
    const equipments = data['equipment']

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col [&>input]:border [&>input]:rounded [&>input]:p-1 [&>input]:px-2 [&>input]:border-zinc-300
            [&>label]:font-medium [&>label]:mt-3 [&>label]:mb-0.5 [&>select]:border [&>select]:rounded [&>select]:p-1 [&>select]:border-zinc-300 "
        >

            {/* <label htmlFor="product">Produto</label>
            <input type="text" {...register("product", { required: true })} />
            {errors.product?.type === "required" && (
                <span className="text-xs">Campo obrigatório</span>
            )} */}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        role="combobox"
                    >
                        {
                            selectedEquipmentId ? equipments.find(
                                (equipment: Equipment) => equipment.id === selectedEquipmentId
                            ).name : "Selecione um equipamento"
                        }
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Command>
                        <CommandInput placeholder="Digite o nome do equipamento"/>
                        <CommandList>
                            <CommandEmpty>Equipamento não encontrado</CommandEmpty>
                            <CommandGroup>
                                {equipments.map((equip: Equipment) => (
                                    <CommandItem
                                        key={equip.id}
                                        // value={equip.equipmentId}
                                        onSelect={() => {
                                            setValue("equipment", equip.id)
                                            setSelectedEquipmentId(equip.id)
                                            setOpen(false)
                                        }}
                                    >
                                        {equip.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <label htmlFor="amount">Quantidade</label>
            <input type="text" {...register("amount", { required: true, min: 1, max: 99 })} />
            {errors.amount?.type === "required" && (
                <span className="text-xs">Campo obrigatório</span>
            )}

            <label htmlFor="movement">Tipo de movimentação</label>
            <select {...register("movementType")}>
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
            </select>

            <DialogFooter className="mt-6">
                <DialogClose asChild>
                    <Button variant={"outline"}>Cancelar</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button variant={"default"} type="submit">Salvar</Button>
                </DialogClose>
            </DialogFooter>

        </form>
    )
}