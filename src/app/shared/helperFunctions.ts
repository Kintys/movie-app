export function isNewFilterObject(obj: any, filterValues: any) {
    let match = false
    for (const key in obj) {
        const value = obj[key]
        if (Array.isArray(value)) {
            match = filterValues.every((item: number) => value.includes(item))
        }
    }
    return match
}
