import { IUser, IContact } from "../../shared/interfaces.ts"
import { User } from "../../DataBase/Model/User.ts"
import { Contact } from "../../DataBase/Model/Contact.ts"
import { validator } from "../../shared/validator.ts"
import {
  formErrorMessage,
  validateToken,
  getIdFromToken,
} from "../../shared/utils.ts"
import { Context } from "https://deno.land/x/oak/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"

export async function createUser(
  parent: any,
  { input }: any,
  ctx: Context,
  info: any
): Promise<{ data: string } | { errors: string[] }> {
  const errors = []
  if (!validator.isEmail(input.email)) {
    errors.push("Provide a valid email.")
  }
  if (!validator.isLength(input.password, { min: 4 })) {
    errors.push("Password must contain at least 5 characters")
  }
  if (errors.length > 0) {
    return { errors: errors }
  }
  const candidate = await User.select("email").where("email", input.email).get()
  console.log(candidate)
  if (candidate.length !== 0) {
    const msg = `Email: ${input.email} already in use`
    return { errors: [msg] }
  }
  const salt = bcrypt.genSaltSync(8)
  const hashedPassword = bcrypt.hashSync(input.password, salt)
  await User.create({
    email: input.email,
    password: hashedPassword,
  })
  return { data: "User created successfully" }
}

export async function createContact(
  parent: any,
  { input }: any,
  ctx: Context,
  info: any
): Promise<{ contact: IContact } | { errors: string } | void> {
  const tokenError = await validateToken(ctx)
  if (tokenError) {
    return tokenError
  }
  const userId = await getIdFromToken(ctx)
  const contact = await Contact.create({
    name: input.name,
    phone: input.phone,
    email: input.email,
    ownerId: +userId,
  })
  const createdContact = await Contact.select("name", "phone", "email", "id")
    .where("id", contact.lastInsertId)
    .get()
  const returnedContact = createdContact[0]
  return { contact: returnedContact }
}
export async function deleteContact(
  parent: any,
  input : any,
  ctx: Context,
  info: any
) {
  const tokenError = await validateToken(ctx)
  if (tokenError) {
    return tokenError
  }
  const userId = await getIdFromToken(ctx)
  const deletion = await Contact.where({id: input.id, ownerId: userId}).delete()
  if (deletion.affectedRows !== 0) {
    return {message:"Contact deleted"}
  } 
  return {message:"Contact was not deleted", errors: "Contact was not deleted"}
}
export async function editContact(
  parent: any,
  { input }: any,
  ctx: Context,
  info: any
) {
  console.log(input)
  const tokenError = await validateToken(ctx)
  if (tokenError) {
    return tokenError
  }
  const userId = await getIdFromToken(ctx)
  const candidate = await Contact.where("id", input.id).update({name: input.name, email:input.email,phone:input.phone})
  if (candidate.affectedRows === 0) {
    return {errors: "Contact was not updated"}
  }
  const updatedContact = {name: input.name, phone: input.phone, id: input.id, email: input.email}
  return { contact: updatedContact }
}
