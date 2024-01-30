import {RideType} from "types/model/rideType";

export const RIDE_TYPES: RideType[] = [
    {
        id: '1',
        type: 'UberX',
        section: 'Recommended',
        maxPassengers: 4,
        price: { perMile: 0.8, perMinute: 0.5 },
        description: 'Efficient and affordable for quick city trips.'
    },{
        id: '2',
        type: 'Van',
        section: 'Recommended',
        maxPassengers: 8,
        price: {
            perMile: 1.2,
            perMinute: 0.7,
        },
        description: 'Spacious and comfortable, ideal for group outings.'
    },
    {
        id: '3',
        type: 'Comfort',
        section: 'Recommended',
        maxPassengers: 4,
        price: {
            perMile: 1,
            perMinute: 0.6,
        },
        description: 'Luxury experience with extra legroom and top-tier service.'
    },
    {
        id: '4',
        type: 'Uber Parcel',
        section: 'Popular',
        maxPassengers: null,
        price: {
            perMile: 0.8,
            perMinute: 0.5,
        },
        description: 'Reliable package delivery with real-time tracking.'
    },
    {
        id: '5',
        type: 'Uber Pets',
        section: 'Popular',
        maxPassengers: 3,
        price: {
            perMile: 0.9,
            perMinute: 0.5,
        },
        description: 'Pet-friendly rides for you and your furry friends.'
    },
    {
        id: '6',
        type: 'Green',
        section: 'Popular',
        maxPassengers: 4,
        price: {
            perMile: 1,
            perMinute: 0.6,
        },
        description: 'Eco-friendly rides in electric or hybrid vehicles.'
    },
    {
        id: '7',
        type: 'Black',
        section: 'Popular',
        maxPassengers: 4,
        price: {
            perMile: 2,
            perMinute: 0.9,
        },
        description: 'Premium black cars for business or special occasions.'
    },
    {
        id: '8',
        type: 'Uber Scooter',
        section: 'Economy',
        maxPassengers: 1,
        price: {
            perMile: 0.5,
            perMinute: 0.3,
        },
        description: 'Quick and nimble, perfect for short solo trips.'
    }
];
