import { type GetValuesFeeResult } from "./types.server"

/**
 * Return the fee of amount based on informed time and fee
 * @param value amout
 * @param time time to consider
 * @param fee fee to consider
 * @returns amount
 */
export const getValuesFee = async (value: number, time: number, fee: number): Promise<GetValuesFeeResult[]> => {

  const calcs = Array.from({ length: time }, (v, month) => month).map((month) => ({
    month: month +1,
    amount: Intl.NumberFormat(
        'pt-BR',
        { style: 'currency',
          currency: 'BRL'
        }
      ).format(value * Math.pow(1 + time, fee))
  } as GetValuesFeeResult))

  if (value === 100) {
    throw new Error('Teste')
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(calcs)
    }, 2000);
  })
}

