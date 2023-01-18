import { NavLink } from '@remix-run/react';
import { type ComponentProps, type PropsWithChildren } from 'react';

type MenuProps = PropsWithChildren & ComponentProps<'ul'>

export const Menu = ({ children, className, ...props }: MenuProps) => {
  return (
    <nav>
      <ul className={`flex ${className}`} { ...props }>
        {children}
      </ul>
  </nav>
  )
}


type MenuItemProps = React.PropsWithChildren & ComponentProps<typeof NavLink> & {
  to: string;
}

export const MenuItem = ({ to, className, children }: MenuItemProps) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive, isPending }) => `
          inline-block
          hover:bg-blue-500
          p-2
          rounded
          active:bg-blue-700

          ${isActive ? 'bg-blue-900' : 'unset'}
          ${isPending ? 'text-slate-900': 'unset'}
          ${className}
        `}
        >
          {children}
      </NavLink>
    </li>
  )
}
