import {
  DataTypes,
  Model,
} from "https://deno.land/x/denodb/mod.ts"
import {Contact} from './Contact.ts'
export class User extends Model {
  static table = "users"
  static timestamps = true

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }
}
