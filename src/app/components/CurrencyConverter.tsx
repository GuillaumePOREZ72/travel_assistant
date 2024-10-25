import { useState, useEffect } from "react";
import { Currency, ExchangeRateResponse } from "../types";

/* The `interface CurrencyConverterProps` is defining the props that the
`CurrencyConverter` component expects to receive. In this case, it specifies
that the `CurrencyConverter` component expects a prop called `countryCurrency`
which should be an object of type `Record<string, Currency>`. */
interface CurrencyConverterProps {
  countryCurrency: Record<string, Currency>;
}
/* The code provided is a React functional component called `CurrencyConverter`.
Here's a breakdown of what the code does: */

export default function CurrencyConverter({
  countryCurrency,
}: CurrencyConverterProps) {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("EUR");
  const [toCurrency, setToCurrency] = useState<string>(
    Object.keys(countryCurrency)[0] || "USD"
  );
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data: ExchangeRateResponse = await response.json();
        setExchangeRate(data.rates[toCurrency]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du taux de change:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (fromCurrency && toCurrency) {
      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const convertedAmount = Number(amount) * (exchangeRate || 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <h3 className="text-lg font-semibold mb-4">Convertisseur de devises</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Montant</label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">De</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EUR">EUR - Euro</option>
              <option value="USD">USD - Dollar US</option>
              <option value="GBP">GBP - Livre Sterling</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Vers</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(countryCurrency).map(([code, currency]) => (
                <option key={code} value={code}>
                  {code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-2">
            <div className="animate-spin inline-block w-6 h-6 border-t-2 border-blue-500 rounded-full"></div>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-lg font-semibold">
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)}{" "}
              {toCurrency}
            </p>
            <p className="text-sm text-gray-500">
              1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
