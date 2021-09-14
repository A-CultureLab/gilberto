import stringHash from "string-hash"

const notificationIdGenerator = (str: string): number => {
    const hash = stringHash(str)
    return Number((hash / 2).toFixed(0))
}

export default notificationIdGenerator