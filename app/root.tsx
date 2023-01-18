import type { ErrorBoundaryComponent, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useNavigation,
} from "@remix-run/react";

import { useMemo } from "react";
import cx from 'classnames'

import { Header } from "./components/Header";
import { ErrorHandler } from "./components/Error";

import styles from "./styles/app.css"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

//***************************************************************************** */
export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

//***************************************************************************** */
export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => <ErrorHandler error={error} local="ROOT" />

//***************************************************************************** */
export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          Oppssss... Tivemos um problema para processar sua requisição!
        </h1>
        <h1>
          {caught.status} - {caught.statusText}
        </h1>
        <Scripts />
      </body>
    </html>
  );
}

//***************************************************************************** */
export default function App() {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Content isLoading={isLoading}/>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

//***************************************************************************** */
type ContentProps = {
  isLoading?: boolean
}

const Content = ({ isLoading = false }: ContentProps) => {
  return (
    <div className={
        cx(
          ` max-w-5xl
            mx-auto mt-6
          `,
          isLoading && `
            opacity-25
            transition-opacity
            delay-200,
            pointer-events-none
            animate-pulse
          `
        )}>
      <Outlet />
    </div>
  )
}

