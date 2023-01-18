import { type ErrorBoundaryComponent } from "@remix-run/node";
import { useLoaderData, type LoaderFunction } from "react-router";
import { ErrorHandler } from "~/components/Error";

type LoaderType = {
  uuid: string
}

export const loader: LoaderFunction = async () => {
  return fetch('http://httpbin.org/uuid')
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => <ErrorHandler error={error} local="INDEX routes" />

export default function Index() {
  const { uuid } = useLoaderData() as LoaderType

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-xl font-bold mb-4">Welcome to Convert My Money</h1>
      <p>UUID: {uuid}</p>
    </div>
  );
}
