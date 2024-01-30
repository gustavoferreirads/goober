export const formatCurrency = (price: number) => {
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return USDollar.format(price)
}

export function formatHourLessMinutes (minutes: number) {
    const now = new Date((new Date() as any) - minutes * 60 * 1000)
    return now.getHours() + ":" + now.getMinutes()
}

export function formatTime(etaInSeconds: number): string {
    const etaInMinutes = etaInSeconds / 60;
    if (etaInMinutes < 60) {
        return `${Math.round(etaInMinutes)} min`;
    } else {
        const etaInHours = etaInMinutes / 60;
        return `${etaInHours.toFixed(1)} hr`;
    }
}

export function convertFromMetersToMiles(meters: number) {
    return Math.round(meters * 0.000621371192);
}