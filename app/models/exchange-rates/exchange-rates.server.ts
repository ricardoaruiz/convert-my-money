import { formatToBRLCurrency, formatToBRLDate } from "~/utils/formatter";
import { type ConvertData, type ConvertResponse, type Symbol, type SymbolsData, type SymbolsResponse } from "./models.server";
import { type GetSymbolsParams } from "./types.server";

const EXCHANGE_RATES_APILAYER_KEY = process.env.EXCHANGE_RATES_APILAYER_KEY || ''
const EXCHANGE_RATES_URL = process.env.EXCHANGE_RATES_URL || ''

/**
 * Create a base requestOptions
 * @param method
 * @returns requestOptions
 */
const getBaseRequestOptions = (method?: string) => {
  const headerValues = new Headers();
  headerValues.append("apikey", EXCHANGE_RATES_APILAYER_KEY);

  return {
    method: method || 'GET',
    headers: headerValues
  };
}

/**
 * * Get all symbols
 * @param showBRL default false to hide BRL
 * @returns list of symbols
 */
export const getSymbols = async(params?: GetSymbolsParams): Promise<SymbolsData> => {
  const showBRL = params?.showBRL || false

  const url = `${EXCHANGE_RATES_URL}/symbols`
  const response = await fetch(url, getBaseRequestOptions())

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const { symbols } = await response.json() as SymbolsResponse

  const symbolsData = Object.keys(symbols)
    .filter((symbol) => showBRL ? symbol : symbol !== 'BRL')
    .map((symbol) => ({
      symbol,
      description: symbols[symbol]
    } as Symbol ))

  return { symbols: symbolsData }
}

/**
 * Convert symbolFrom to symbolTo
 * @param symbolTo
 * @param symbolFrom
 * @param amount
 * @returns result of convertion
 */
export const convertSymbol = async(symbolTo: string, symbolFrom: string, amount?: number): Promise<ConvertData> => {
  const url = `${EXCHANGE_RATES_URL}/convert?to=${symbolTo}&from=${symbolFrom}&amount=${amount || 1}`
  const response = await fetch(url, getBaseRequestOptions())

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const { date, result } = await response.json() as ConvertResponse

  return {
    date: formatToBRLDate(date),
    result: formatToBRLCurrency(result)
  } as ConvertData
}
