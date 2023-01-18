import { type ErrorBoundaryComponent } from "@remix-run/node";
import { useLoaderData, type LoaderFunction } from "react-router"
import { ErrorHandler } from "~/components/Error";
import { convertSymbol } from "~/models/exchange-rates/exchange-rates.server";


type LoadDataType = {
  symbolFrom: string;
  symbolTo: string;
  date: string;
  result: number
}

export const loader: LoaderFunction = async ({ params }) => {
  const { symbol: symbolFrom } = params;
  const symbolTo = 'BRL'
  const { date, result } = await convertSymbol(symbolTo, symbolFrom || 'USD')

  return {
    symbolFrom,
    symbolTo,
    date,
    result
    }
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => <ErrorHandler error={error} local="Symbol" />

const Symbol = () => {
  const { symbolFrom, symbolTo, result, date } = useLoaderData() as LoadDataType

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Conversão da moeda {symbolFrom} para {symbolTo}</h1>

      <Table>
        <thead >
          <tr>
            <TableHeader>Moeda base</TableHeader>
            <TableHeader>Moeda destino</TableHeader>
            <TableHeader>Valor</TableHeader>
            <TableHeader>Data</TableHeader>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableData align="center">{symbolFrom}</TableData>
            <TableData align="center">{symbolTo}</TableData>
            <TableData align="right">{result}</TableData>
            <TableData align="center">{date}</TableData>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

const Table = ({children}: React.PropsWithChildren) => {
  return <table className="border-collapse border border-slate-400 w-full">{children}</table>
}

const TableHeader = ({children}: React.PropsWithChildren) => {
  return <th className="border border-slate-300 p-2">{children}</th>
}

type TableDataProps = React.PropsWithChildren & {
  align?: 'left' | 'center' | 'right'
}

const TableData = ({children, align = 'left'}: TableDataProps) => {
  const classes = `
    border
    border-slate-300
    p-2
    text-${align}
  `
  return <td className={classes}>{children}</td>
}

export default Symbol
