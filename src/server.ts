import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { createConnection, useContainer } from "typeorm";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { graphqlUploadExpress } from "graphql-upload";
import dotenv from "dotenv";

import logger from "@shared/util/logger";

dotenv.config();

export class SetupServer {
  private app: express.Application;
  private apolloServer: ApolloServer;

  /*
   * same as this.port = port, declaring as private here will
   * add the port variable to the SetupServer instance
   */
  constructor() {
    this.app = express();
  }

  /**
   * Initializing Express Server
   */
  private async setupExpress(): Promise<void> {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors({ origin: "*" }));
    this.app.use(graphqlUploadExpress({ maxFiles: 10 }));
  }

  private async setupApolloServer(): Promise<void> {
    const schema = await buildSchema({
      resolvers: [__dirname + "/modules/**/resolvers/**/*.{ts,js}"],
      emitSchemaFile: true,
      container: Container
    });

    this.apolloServer = new ApolloServer({
      uploads: false,
      schema,
      context: ({ req }: any) => ({ req }),
      rootValue: true,
      debug: true,
      introspection: true,
      playground: true,
      formatError: error => {
        logger.error(error);
        console.log("error.path", error.extensions?.exception?.stacktrace);
        console.log("error.message", error.originalError?.stack);
        return error;
      }
    });
    this.apolloServer.applyMiddleware({ app: this.app, path: "/" });
  }

  /**
   * Creating connection to the database.
   */
  private async databaseSetup(): Promise<void> {
    await createConnection()
      .then(() => logger.info("--> Connected BD with success..."))
      .catch(err => logger.error(`--> ${err}`));
  }

  /*
   * We use a different method to init instead of using the constructor
   * this way we allow the server to be used in tests and normal initialization
   */
  public async init(): Promise<void> {
    // register 3rd party IOC container
    useContainer(Container);

    this.setupExpress();
    this.setupApolloServer();
    await this.databaseSetup();
  }

  /**
   * Starting Apollo Server
   */
  public start(): void {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () =>
      logger.info(
        `🚀  Apollo Server listening on port: ${PORT} with playground`
      )
    );
  }
}
