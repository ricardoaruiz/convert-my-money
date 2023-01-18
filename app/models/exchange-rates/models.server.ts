//==============================================
//================ Symbo Types =================
//==============================================

export type Symbol = {
  symbol: string;
  description: string;
}

export type SymbolsData = {
  symbols: Symbol[]
}

export type SymbolsResponse = {
  success: boolean;
  symbols: { [key:string]: string }
}

//==============================================
//============== Convert Types =================
//==============================================

export type ConvertData = Omit<ConvertResponse, 'success'>

export type ConvertResponse = {
  success: boolean;
  date: string;
  result: string;
}
