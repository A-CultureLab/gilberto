// 23000 -> 23km
// 2300 -> 2.3km
// 2000 -> 2km
// 200 -> 200m


const meterUnit = (meter: number): string => {
    if (meter === 0) return '0km'
    if (meter < 1000) return meter + 'm'
    if (meter < 10000) {
        return ((meter / 1000).toFixed(1) + 'km').replace('.0', '')
    }
    return (meter / 1000).toFixed(0) + 'km'
}

export default meterUnit