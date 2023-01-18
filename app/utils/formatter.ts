/**
 *
 * @param value
 * @returns
 */
export const formatToBRLCurrency = (value: string | number) =>
  Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(typeof value === 'string' ? Number(value) : value)

/**
 *
 * @param date
 * @returns
 */
export const formatToBRLDate = (date: string | Date) =>
  Intl.DateTimeFormat('pt-BR').format(typeof date === 'string' ? new Date(date) : date)

