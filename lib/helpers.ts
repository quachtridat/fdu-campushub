export function hasPreviousIndex(idx: number, arr?: Array<any>): boolean {
  return arr ? idx > 0 : false
}

export function hasNextIndex(idx: number, arr?: Array<any>): boolean {
  return arr ? idx + 1 < arr.length : false
}
