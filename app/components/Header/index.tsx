import { Menu, MenuItem } from '../Menu'

export const Header = () => {
  return (
    <header className="p-4 bg-slate-600 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-lg font-bold">Coversão de moedas e juros</h1>

        <Menu>
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/juros">Juros</MenuItem>
          <MenuItem to="/moedas">Moedas</MenuItem>
          <MenuItem to="/aboutus">Sobre Nós</MenuItem>
        </Menu>
      </div>
  </header>
  )
}
