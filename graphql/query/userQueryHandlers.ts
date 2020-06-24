import { jwtKey } from "../../config/productionKeys.ts"
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts"
import { validateToken, getIdFromToken } from "../../shared/utils.ts"
import { validator } from "../../shared/validator.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"
import { User } from "../../DataBase/Model/User.ts"
import { Contact } from "../../DataBase/Model/Contact.ts"
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"

const key = jwtKey

const header: Jose = {
  alg: "HS256",
  typ: "JWT",

}


export async function getUserContacts(
  parent: any,
  input: any,
  ctx: any,
  info: any
) {
  console.log(ctx)
  const errors = await validateToken(ctx)
  if(errors) {
    return errors
  }
  const userId = await getIdFromToken(ctx)
  const candidates = await Contact.select("email", "name", "phone","id")
    .where("ownerId", userId)
    .get()
  return { contacts: candidates }
}

export async function userLogin(
  parent: any,
  { input }: any,
  req: Request,
  info: any
) {
  const errorsV = []
  if (!validator.isEmail(input.email)) {
    errorsV.push("Provide a valid email.")
  }
  if (!validator.isLength(input.password, { min: 4 })) {
    errorsV.push("Password must contain at least 5 characters")
  }
  if (errorsV.length > 0) {
    return { errors: errorsV }
  }
  const candidate = await User.select("email", "password", "id")
    .where("email", input.email)
    .get()
  console.log(candidate)
  if (candidate.length === 0) {
    const msg = `User with email: ${input.email} is not registered`
    return { errors: [msg] }
  } 
  const result = bcrypt.compareSync(input.password, candidate[0].password)
  if (!result) {
    return {errors: ["Password is invalid"]}
  }


  const payload: Payload = {
    iss: candidate[0].id,
    exp: setExpiration(new Date().getTime() + 60 * 60 * 1000),
  }
  const jwt = makeJwt({ key, header, payload })
  return { token: jwt }
}
