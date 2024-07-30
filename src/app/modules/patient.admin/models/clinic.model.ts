import { BasicAddress } from "src/app/models/common/basic.address"

export interface Clinic{
    id:number|null,
    name:string|null,
    address:string,
    clinicAddress?: BasicAddress
    selected?:boolean
    status?:boolean
    createdAt?:number
}