/* This TypeScript code snippet is defining three interfaces: */
/* The `Currency` interface in the TypeScript code snippet is defining a structure
for an object that represents information about a currency. It specifies that a
`Currency` object should have two properties: `name` of type string and `symbol`
of type string. This interface can be used to ensure that objects representing
currencies in the codebase adhere to this structure. Additionally, since it is
exported, it can be imported and used in other parts of the codebase. */
export interface Currency {
  name: string;
  symbol: string;
}

/* The `Country` interface in the TypeScript code snippet is defining a structure
for an object that represents information about a country. Here's a breakdown of
its properties: */
export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  capital?: string[];
  region: string;
  currencies?: Record<string, Currency>;
  languages?: Record<string, string>;
  flags: {
    png: string;
    svg: string;
  };
  timezones: string[];
  latlng: [number, number]; // Added latitude and longitude
}

/* The `ExchangeRateResponse` interface in the TypeScript code snippet is defining
a structure for an object that represents a response containing exchange rates.
Here's a breakdown of its properties: */
export interface ExchangeRateResponse {
  rates: Record<string, number>;
  base: string;
  date: string;
}
