import "dotenv/config";
import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import {
  statelessSessions,
  withItemData,
} from "@keystone-next/keystone/session";
import { User } from "./schemas/User";
import { Product } from "./schemas/Product";

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

const databaseUrl = process.env.DATABASE_URL;
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.COOKIE_SECRET,
};

export default withAuth(
  config({
    server: {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseUrl,
    },
    lists: createSchema({
      User,
      Product,
    }),
    ui: {
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      User: "id",
    }),
  })
);
