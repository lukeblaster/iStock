import { Sequelize } from "sequelize";

const sequelize = new Sequelize('gestaoestoque', 'postgres', 'root123', {
    host: 'localhost',
    dialect: 'postgres'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão com PostgreSQL estabelecida com sucesso!");
    } catch(error) {
        console.error("Erro ao conectar com o PostgreSQL: ", error)
    }
}

export { sequelize, connectDB }