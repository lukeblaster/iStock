import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import Equipment from "./Equipment.js";

const Movimentation = sequelize.define('Movimentation', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    movementType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    equipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Equipment,
            key: "id"
        }
    }
})

Movimentation.belongsTo(Equipment, {
    foreignKey: "equipmentId",
    onUpdate: "NO ACTION"
})
Equipment.hasMany(Movimentation, { foreignKey: "equipmentId", })

export default Movimentation;