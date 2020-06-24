import {jwtKey} from '../config/productionKeys.ts'
import { Context } from "https://deno.land/x/oak/mod.ts"
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
export const formErrorMessage = (errors: { message: string }[]): string => {
    return errors.reduce((acc, err) => {
        return (acc = acc.concat(err.message))
    },'')
}


export const validateToken = async (
  ctx: Context
): Promise<{ errors: string } | void> => {
  const headers: Headers = ctx.request.headers
  const authorization = headers.get("Authorization")
  if (!authorization) {
    return { errors: "No valid token provided. Please login" }
  }
  const jwt = authorization.split(" ")[1]
  if (!jwt) {
    return { errors: "No valid token provided. Please login" }
  }
  if (!(await validateJwt(jwt, jwtKey)).isValid) {
    return { errors: "Session out. Please login" }
  }
}
export const getIdFromToken = async(ctx: any) => {
  const tokenHeader: string = ctx.request.headers.get("Authorization")
  const token = tokenHeader.split(' ')[1]
  console.log(tokenHeader)
  const data: any = await validateJwt(token, jwtKey)
  const userId = data.payload.iss
  return userId
}