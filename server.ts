import { Application } from "https://deno.land/x/oak/mod.ts"
import { typeDefs } from "./graphql/typeDefs.ts"
import { resolvers } from "./graphql/resolver.ts"
import { applyGraphQL } from "https://deno.land/x/oak_graphql/mod.ts"
import db from "./DataBase/db.ts"
import { User } from "./DataBase/Model/User.ts"
import { Contact } from "./DataBase/Model/Contact.ts"
import { oakCors } from "https://deno.land/x/cors/mod.ts"

const port = 4000

const app = new Application()
const GraphQLService = await applyGraphQL({
  typeDefs,
  resolvers,
  context: (ctx) => {
    return ctx
  },
})

db.link([User, Contact])

await db.sync()

app.use(oakCors())

app.use(GraphQLService.routes(), GraphQLService.allowedMethods())

app.addEventListener("listen", (AppListenEvent) => {
  console.log(
    `Listening on ${
      AppListenEvent.hostname ? AppListenEvent.hostname : "localhost:"
    }
    ${AppListenEvent.port}`
  )
})
app.addEventListener("error", (evt) => {
  console.log(evt.error)
})

await app.listen({ port })
