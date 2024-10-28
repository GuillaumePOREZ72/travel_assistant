"use client";

import { useState, useEffect } from "react";
import { Currency, ExchangeRateResponse } from "../types";

interface CurrencyConverterProps {
  countryCurrency: Record<string, Currency>;
}

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
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-4 
      transition-colors duration-300"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Convertisseur de devises
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
            Montant
          </label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-full px-3 py-2 border dark:border-gray-600 
              bg-white dark:bg-gray-700 
              text-gray-900 dark:text-white
              rounded-md 
              focus:outline-none focus:ring-2 
              focus:ring-blue-500 dark:focus:ring-blue-400
              transition-colors duration-200"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              De
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 
                border dark:border-gray-600 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white
                rounded-md 
                focus:outline-none focus:ring-2 
                focus:ring-blue-500 dark:focus:ring-blue-400
                transition-colors duration-200"
            >
              <option value="EUR">EUR - Euro</option>
              <option value="USD">USD - Dollar US</option>
              <option value="GBP">GBP - Livre Sterling</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Vers
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 
                border dark:border-gray-600 
                bg-white dark:bg-gray-700 
                text-gray-900 dark:text-white
                rounded-md 
                focus:outline-none focus:ring-2 
                focus:ring-blue-500 dark:focus:ring-blue-400
                transition-colors duration-200"
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
            <div
              className="animate-spin inline-block w-6 h-6 
              border-t-2 border-blue-500 dark:border-blue-400 
              rounded-full"
            ></div>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)}{" "}
              {toCurrency}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
