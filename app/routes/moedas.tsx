import { type ErrorBoundaryComponent } from '@remix-run/node';
import { Outlet } from '@remix-run/react'
import { ErrorHandler } from '~/components/Error';
import { Menu, MenuItem } from '~/components/Menu'

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => <ErrorHandler error={error} local="CurrencyLayout" />

export const CurrencyLayout = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Moedas mais utilizadas</h2>

      <p className='text-xs font-bold'>Moedas mais solicitadas</p>
      <header className='bg-slate-700 mb-2 rounded shadow-md shadow-slate-400'>
        <Menu className="text-white">
          <MenuItem to="/moedas/USD">USD</MenuItem>
          <MenuItem to="/moedas/EUR">EUR</MenuItem>
        </Menu>
      </header>

      <Outlet />
    </>
  )
}

export default CurrencyLayout
