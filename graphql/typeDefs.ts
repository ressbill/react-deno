import { gql } from "https://deno.land/x/oak_graphql/mod.ts"
import { UserDataInp, User } from "./defenitionTypes.ts"


const gqlString = `
    ${UserDataInp}
    type Answer {
      data: String
      errors: [String]
    }
    type AuthData {
      token: String
      errors: [String]
    }
    type Contact {
      name: String!
      phone: String
      email: String
      id: ID!
    }
    input ContactInput {
      name: String!
      phone: String
      email: String
    }
    type Contacts {
      contacts: [Contact]
      errors: String
    }
    type ContactAnswer {
      contact: Contact
      errors: String
    }
    type DeleteAnswer {
      message: String!
      errors: String
    }
    input ContactEditInput {
      name: String!
      phone: String
      email: String
      id: ID!
    }
    type Query {
      getContacts: Contacts!
      login(input: UserData!): AuthData!
    }
    type Mutation {
      createUser(input: UserData!): Answer
      createContact(input: ContactInput): ContactAnswer
      deleteContact(id: Int!): DeleteAnswer
      editContact(input: ContactEditInput): ContactAnswer
    }

`
export const typeDefs = gql(gqlString)