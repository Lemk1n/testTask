export const floatToFixed = (number: string, dcPart: number): string => {
    return parseFloat(number).toFixed(dcPart);
}