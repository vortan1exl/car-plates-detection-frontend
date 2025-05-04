
export interface VehicleStatus {
    carPlate: string;
    brand: string;
    model: string;
    color: string;
    status: string;
}

export interface VehicleHistory {
    carPlate: string;
    brand: string;
    model: string;
    color: string;
    entryTime: string;
    exitTime: string;
    duration: string;
}

export interface ParkStatus {
    status: string;
    countCar: number;
}

export interface ProfileStudent {
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    student_card: string;
    faculty: string;
    course: number;
    groups: string;
    vehicleDTO: VehicleDTO[];
}

export interface VehicleDTO {
    carPlate: string;
    brand: string;
    model: string;
    color: string;
}

