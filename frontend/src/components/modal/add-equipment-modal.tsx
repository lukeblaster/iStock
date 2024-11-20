import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "../ui/button"
import { DialogFooter, DialogClose } from "../ui/dialog"
import { useMutation, gql } from "@apollo/client"
import { GET_EQUIPMENTS } from "@/routes/equipments"
interface IFormInput {
    product: string,
    initialAmount: number
}

const CREATE_EQUIPMENT = gql`
    mutation CreateEquipment($name: String!, $quantityInStock: Int!) {
        createEquipment(name: $name, quantityInStock: $quantityInStock) {
            name,
            quantityInStock
        }
    }
`

export function AddEquipmentModal() {
    const { register, formState: { errors }, handleSubmit } = useForm<IFormInput>();
    const [createEquipment] = useMutation(CREATE_EQUIPMENT,
        {
            refetchQueries: [
                GET_EQUIPMENTS,
                'GetEquipments'
            ]
        }
    );

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        const quantityInStock = +data.initialAmount
        createEquipment({
            variables: {
                name: data.product,
                quantityInStock: quantityInStock
            }
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col [&>input]:border [&>input]:rounded [&>input]:p-1 [&>input]:px-2 [&>input]:border-zinc-300
            [&>label]:font-medium [&>label]:mt-3 [&>label]:mb-0.5 [&>select]:border [&>select]:rounded [&>select]:p-1 [&>select]:border-zinc-300 "
        >

            <label htmlFor="product">Nome do produto</label>
            <input type="text" {...register("product", { required: true })} />
            {errors.product?.type === "required" && (
                <span className="text-xs">Campo obrigatório</span>
            )}

            <label htmlFor="amount">Quantidade</label>
            <input type="number" {...register("initialAmount", { required: true, min: 0, max: 9999 })} />
            {errors.initialAmount?.type === "required" && (
                <span className="text-xs">Campo obrigatório</span>
            )}

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