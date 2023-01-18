import { type ErrorBoundaryComponent } from '@remix-run/node';
import { Outlet } from '@remix-run/react'
import { ErrorHandler } from '~/components/Error';
import { Menu, MenuItem } from '~/components/Menu'

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => <ErrorHandler error={error} local="FeesLayout" />

export const FeesLayout = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Valores pré-definidos</h2>
      <p className='text-xs font-bold'>Selecione um dos valores abaixo para projetar os juros</p>

      <header className='bg-slate-700 mb-2 rounded shadow-md shadow-slate-400'>
        <Menu className="text-white">
          <MenuItem to="/juros/100">R$ 100,00</MenuItem>
          <MenuItem to="/juros/200">R$ 200,00</MenuItem>
          <MenuItem to="/juros/1000">R$ 1.000,00</MenuItem>
          <MenuItem to="/juros/2000">R$ 2.000,00</MenuItem>
          <MenuItem to="/juros/300">R$ 300,00</MenuItem>
          <MenuItem to="/juros/3000">R$ 3.000,00</MenuItem>
        </Menu>
      </header>

      <Outlet />
    </>
  )
}

export default FeesLayout
