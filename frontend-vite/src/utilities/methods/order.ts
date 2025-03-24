type Order = 'asc' | 'desc'
export const order = <T>(array: readonly T[], getValue: (item: T) => number, order: Order) => {
    return [...array].sort((a, b) => {
        if (order === 'asc') {
            return getValue(a) - getValue(b)
        }
        return getValue(b) - getValue(a)
    })
}