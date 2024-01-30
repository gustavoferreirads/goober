export type RideTypePrice = {
    perMile: number;
    perMinute: number;
};

export type RideType = {
    id: string;
    type: string;
    description: string;
    section: string;
    eta?: number;
    totalPrice?: number;
    maxPassengers: number | null;
    price?: RideTypePrice;
};