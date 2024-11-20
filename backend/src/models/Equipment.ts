import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const Equipment = sequelize.define('Equipment', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantityInStock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

export default Equipment;