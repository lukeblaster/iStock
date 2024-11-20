import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors'
import http from 'http'
import express from 'express'
import { typeDefs, resolvers } from "./schema/index.js";
import { connectDB, sequelize } from "./db/db.js";

interface MyContext {
    token?: string;
}

const createServer = async () => {
    const app = express()
    const httpServer = http.createServer(app);

    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })

    await server.start()

    app.use(
        '/',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.token })
        }),
    )

    return { server, httpServer }
}

// Sincronizando o modelo com o banco de dados
const syncDatabase = async () => {
    try {
        await sequelize.sync(); // Isso irá criar a tabela se não existir
        console.log("Tabelas sincronizadas com sucesso!");
    } catch (error) {
        console.error("Erro ao sincronizar tabelas:", error);
    }
};

const startServer = async () => {
    await connectDB();
    await syncDatabase();
    const { httpServer } = await createServer();

    // Iniciar o servidor HTTP
    httpServer.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://localhost:4000/`)
    })
}

startServer();