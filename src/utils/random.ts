import {Car} from "types/model/car";

export function generateFakeName() {
    const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emily', 'David', 'Emma', 'Chris', 'Laura'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Miller', 'Davis', 'Garcia', 'Wilson', 'Martinez'];
    const getRandomElement = (array: string[]) => {
        return array[Math.floor(Math.random() * array.length)];
    }
    const randomFirstName = getRandomElement(firstNames);
    const randomLastName = getRandomElement(lastNames);
    return `${randomFirstName} ${randomLastName}`;
}

export function generateRandomRating(min: number = 0, max: number = 5) {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

export const generateRandomCar = (): { plate: string, model: string } => {
    const plates = [
        'ABC123', 'XYZ789', 'JKL456',
        'PLT849', 'QWE112', 'RTY856',
        'FGH234', 'LMN321', 'OPU754',
        'ZXC098', 'VAS456', 'BGT532'
    ];

    const models = [
        'Honda Civic', 'Toyota Corolla', 'Ford Focus',
        'Chevrolet Cruze', 'Hyundai Elantra', 'Tesla Model 3',
        'BMW 3 Series', 'Audi A4', 'Mercedes-Benz C-Class',
        'Volkswagen Golf', 'Nissan Sentra', 'Mazda 3'
    ];

    return {
        plate: plates[Math.floor(Math.random() * plates.length)],
        model: models[Math.floor(Math.random() * models.length)]
    };
};