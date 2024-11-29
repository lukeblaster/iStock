import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { useQuery, gql } from "@apollo/client"
import { ArrowLeftRight, Wrench } from "lucide-react"

export const GET_DATADASHBOARD = gql`
    query GetDataDashboard {
        dataDashboard {
            equipmentQuantity
            movimentationQuantity
        }
    }
`


export function Home() {
    const { loading, data, error} = useQuery(GET_DATADASHBOARD)

    if(loading) return "Carregando..."
    if(error) return `Erro: ${error?.message}`

    return (
        <div className="flex w-full gap-3">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex gap-1 align-middle"><Wrench size={18}/> Equipamentos</CardTitle>
                    <CardDescription>Quantidade de equipamentos cadastrados</CardDescription>
                </CardHeader>
                <CardContent>
                    <p><b>{data.dataDashboard.equipmentQuantity}</b> equipamentos</p>
                </CardContent>
            </Card>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex gap-1 align-middle"><ArrowLeftRight size={18}/> Movimentações</CardTitle>
                    <CardDescription>Quantidade de movimentações efetuadas</CardDescription>
                </CardHeader>
                <CardContent>
                    <p><b>{data.dataDashboard.movimentationQuantity}</b> movimentações</p>
                </CardContent>
            </Card>
        </div>
    )
}