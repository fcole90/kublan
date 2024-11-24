export const checkExhaustiveCondition = (obj: never, getMessage: (strReps: string) => string) => {
  const strRepr = String(obj)
  throw new Error(getMessage(strRepr))
}