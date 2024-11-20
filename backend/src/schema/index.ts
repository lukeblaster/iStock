import Equipment from "../models/Equipment.js"
import Movimentation from "../models/Movimentation.js"

interface Equipment {
    id: number
    name: String
    quantityInStock: number
}

export const resolvers = {
    Query: {
        equipment: async () => {
            return await Equipment.findAll({
                order: [
                    ['id', 'DESC']
                ],
                include: Movimentation
            })
        },
        movimentation: async () => {
            return await Movimentation.findAll({
                order: [
                    ['id', 'DESC']
                ],
                include: Equipment
            })
        }
    },
    Movimentation: {
        equipment: (movimentation) => {
            return Equipment.findByPk(movimentation.equipmentId)
        }
    },
    // Equipment: {
    //     movimentation: (equipment) => {
    //         return Movimentation.findAll({ where: { equipmentId: equipment.equipmentId }})
    //     }
    // },
    Mutation: {
        // Movimentation
        createMovimentation: async (_: any, { amount, status, movementType, equipmentId }: {
            amount: number,
            status: string,
            movementType: string,   
            equipmentId: number
        }) => {
            const equipment = await Equipment.findByPk(equipmentId);
            if(!equipment) console.log(`Equipamento com id ${equipmentId} não encontrado.`)

            if(movementType == "entrada") {
                try {
                    await equipment.increment({
                        quantityInStock: amount
                    })
                } catch(e) {
                    console.warn(e)
                }
                
            }

            if(movementType == "saida") {
                try {
                    await equipment.decrement({
                        quantityInStock: amount
                    })
                } catch(e) {
                    console.warn(e)
                }
                
            }

            const movimentation = await Movimentation.create({ amount, status, movementType, equipmentId })
            return movimentation
        },
        readMovimentation: async (_: any, { id }: { id: number }) => {
            const movimentation = await Movimentation.findByPk(id)
            return movimentation
        },
        updateMovimentation: async (_: any, { id, amount, status, movementType, product }: {
            id: number,
            amount: number,
            status: string,
            movementType: string,
            product: Equipment
        }) => {
            const movimentation = await Movimentation.update({ amount, status, movementType, product }, { where: { id: id } })
            return movimentation
        },
        deleteMovimentation: async (_: any, { id }: { id: number }) => {
            const movimentation = await Movimentation.destroy({ where: { id: id } })
            return movimentation
        },

        // Equipment
        createEquipment: async (_: any, { name, quantityInStock }: { name: string, quantityInStock: number }) => {
            const equipment = await Equipment.create({ name, quantityInStock })
            return equipment
        },
        readEquipment: async (_: any, { id }: { id: number }) => {
            const equipment = await Equipment.findByPk(id)
            return equipment
        },
        updateEquipment: async (_: any, { equipmentId, name, quantityInStock }: { equipmentId: number, name: string, quantityInStock: number }) => {
            const equipment = await Equipment.update({ name, quantityInStock }, { where: { equipmentId: equipmentId } })
            return equipment
        },
        deleteEquipment: async (_: any, { id }: { id: number }) => {
            const equipment = await Equipment.destroy({ where: { id: id } })
            return equipment
        }
    }
}

export const typeDefs = `#graphql

    input EquipmentContent {
        id: Int
        name: String
        quantityInStock: Int
    }

    type Equipment {
        id: Int
        name: String
        quantityInStock: Int
    }

    type Movimentation {
        id: String
        amount: Int
        status: String
        movementType: String
        equipment: Equipment
    }

    type Query {
        equipment: [Equipment]
        movimentation: [Movimentation]
    }

    type Mutation {
        # Movimentation
        createMovimentation(amount: Int!, status: String!, movementType: String!, equipmentId: Int!): Movimentation
        readMovimentation(id: Int!): Movimentation
        updateMovimentation(id: Int!, amount: Int, status: String, movementType: String, product: EquipmentContent!): Movimentation
        deleteMovimentation(id: Int!): Movimentation
        # Equipment
        createEquipment(name: String!, quantityInStock: Int!): Equipment
        readEquipment(equipmentId: Int!): Equipment
        updateEquipment(equipmentId: Int!, name: String, quantityInStock: Int): Equipment
        deleteEquipment(equipmentId: Int!): Equipment
    }

`