import { EEspecialidad } from "./eespecialidad";
import { IDireccion } from "./idireccion";

export interface IMedico {
    id?:             number,
    nombre?:         string,
    email?:          string,
    telefono?:       string,
    documento?:      string,
    especialidad:    EEspecialidad,
    datosDireccion?: IDireccion
}
