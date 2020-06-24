import { createUser, createContact, deleteContact, editContact } from "./mutation/userMutationHandlers.ts"
import { getUserContacts, userLogin } from "./query/userQueryHandlers.ts"


export const resolvers = {
  Query: {
    getContacts: getUserContacts,
    login: userLogin,
  },
  Mutation: {
    createUser: createUser,
    createContact: createContact,
    deleteContact: deleteContact,
    editContact: editContact
  },
}
