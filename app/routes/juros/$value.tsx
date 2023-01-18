import { type ErrorBoundaryComponent, type LoaderFunction } from "@remix-run/node"
import { json, useLoaderData } from "react-router"
import { ErrorHandler } from "~/components/Error";
import { getValuesFee } from "~/models/fees/fees.server";
import { formatToBRLCurrency } from "~/utils/formatter";

type Calc = {
  month: number;
  amount: number;
}

type LoaderData = {
  value: string;
  calcs: Calc[]
}

export const loader: LoaderFunction = async ({params}) => {

  const amount = Number(params.value) || 0
  const numberOfMonths = 120
  const fee = 0.01

  // calc amount to each month
  const calcs = await getValuesFee(amount, numberOfMonths, fee)

  return json({ calcs, value: formatToBRLCurrency(amount) })
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => <ErrorHandler error={error} local="FeesValues" />

const FeesValues = () => {
  const { calcs, value } = useLoaderData() as LoaderData

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Juros calculado para: {value}</h1>

      <table className="border-collapse border border-slate-400 w-full">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2">Meses</th>
            <th className="border border-slate-300 p-2">Montante</th>
          </tr>
        </thead>
        <tbody>
          {calcs.map(({ month, amount }) => (
            <tr key={month} className="hover:bg-slate-500 hover:text-white cursor-default">
              <td className="border border-slate-300 p-2">{month}</td>
              <td className="border border-slate-300 p-2">{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>

  )
}

export default FeesValues
