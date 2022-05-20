import { Position } from "./position";
import { WorkerStatus } from "./workerStatus";

export class Worker {
    id: number;
    jmbg: string;
    coefficient: number;
    nameAndSurname: string;
    dateOfEmployment: Date;
    workerStatusId: number;
    positionId: number;
    status: WorkerStatus;
    position: Position;
}