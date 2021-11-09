// 1 -> 1
// 11 -> 11
// 111 -> 111
// 1111 -> 1,111
// 11111 -> 1.1만
// 111111 -> 11만
// 1111111 ->  111만

const followCountUnit = (count: number) => {
    const str = count.toString()
    switch (str.length) {
        case 0: return 0
        case 1:
        case 2:
        case 3:
            return str
        case 4:
            return `${str[0]},${str[1]}${str[2]}${str[3]}`
        case 5:
            return `${str[0]},${str[1]}만`
        case 6:
            return `${str[0]}${str[1]}만`
        case 7:
            return `${str[0]}${str[1]}${str[1]}만`
        default:
            return str
    }
}

export default followCountUnit