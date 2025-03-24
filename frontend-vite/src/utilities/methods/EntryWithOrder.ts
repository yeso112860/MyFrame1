export type EntryWithOrder = {
    order : number
}

export const sortEntriesWithOrder = <T extends EntryWithOrder> (items:T[])=> order(items,({order})=>order,'asc')