import { type ErrorBoundaryComponent } from "@remix-run/node";

type ErrorBoundaryProps = React.ComponentProps<ErrorBoundaryComponent> & {
  local?: string;
}

export const ErrorHandler = ({ error, local }: ErrorBoundaryProps) => {
  return (
    <div className="
      text-center
      bg-red-400
      rounded
      px-2
      py-4
      flex
      flex-col
      items-center
      shadow-2xl
    ">
      <h2 className="text-lg font-bold text-white">Ops... Ocorreu um erro, por favor tente novamente mais tarde!</h2>
      <h3 className="text-md font-bold text-white">{error.name}</h3>
      <h3 className="text-md font-bold text-white">{error.message}</h3>
      {local && <h2>Esse erro foi captado em {local}</h2>}
    </div>
  );
}
