import { EEspecialidad } from "./eespecialidad";

export interface IConsulta {
    idPaciente:     number,
    idMedico:       number,
    data:           Date,
    especialidad:   EEspecialidad
}
