import { type ErrorBoundaryComponent } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ErrorHandler } from "~/components/Error";
import { getSymbols } from "~/models/exchange-rates/exchange-rates.server";

type LoadDataType = {
  symbols: {
    symbol: string;
    description: string;
  }[]
}

export const loader = async (): Promise<LoadDataType> => {
  const { symbols } = await getSymbols()
  return { symbols }
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => <ErrorHandler error={error} local="SymbolIndex" />

const SymbolIndex = () => {
  const { symbols } = useLoaderData<typeof loader>()

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Moedas</h1>

      <table className="border-collapse border border-slate-400 w-full">
        <thead>
          <tr>
            <th className="border border-slate-300 p-2">Symbol</th>
            <th className="border border-slate-300 p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {symbols.map(({ symbol, description }) => (
            <tr key={symbol} className="hover:bg-slate-500 hover:text-white cursor-pointer">
              <td className="border border-slate-300 text-center">
                <Link to={`/moedas/${symbol}`} className="inline-block w-full p-2">
                  {symbol}
                </Link>
              </td>
              <td className="border border-slate-300">
                <Link to={`/moedas/${symbol}`} className="inline-block w-full p-2">
                  {description}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default SymbolIndex
