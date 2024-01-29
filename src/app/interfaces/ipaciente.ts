import { IDireccion } from "./idireccion";

export interface IPaciente {
    id:                 number,
    nombre:             string,
    email:              string,
    telefono:           string,
    documento:          string,
    datosDireccion:     IDireccion
}
