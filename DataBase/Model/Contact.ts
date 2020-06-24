import { DataTypes, Model, Relationships } from "https://deno.land/x/denodb/mod.ts"
import {User} from './User.ts'
export class Contact extends Model {
  static table = "contacts"
  static timestamps = true

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }
}
