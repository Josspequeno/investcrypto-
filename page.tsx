import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Home() {
  const [prices, setPrices] = useState([]);
  const [language, setLanguage] = useState("en");

  const translations = {
    en: {
      welcome: "Welcome to InvestCrypto",
      buy: "Buy",
      sell: "Sell",
      login: "Login",
      register: "Register"
    },
    pt: {
      welcome: "Bem-vindo ao InvestCrypto",
      buy: "Comprar",
      sell: "Vender",
      login: "Entrar",
      register: "Registrar"
    }
  };

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 5,
          page: 1,
          sparkline: false
        }
      })
      .then((res) => setPrices(res.data))
      .catch((err) => console.error(err));
  }, []);

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{t.welcome}</h1>
        <div>
          <Button onClick={() => setLanguage("en")} variant="ghost">EN</Button>
          <Button onClick={() => setLanguage("pt")} variant="ghost">PT</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prices.map((coin) => (
          <Card key={coin.id} className="bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{coin.name}</h2>
                  <p>${coin.current_price.toLocaleString()}</p>
                </div>
                <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex gap-4">
        <Button className="bg-green-600">{t.buy}</Button>
        <Button className="bg-red-600">{t.sell}</Button>
      </div>
      <div className="mt-6">
        <Button variant="outline" className="mr-2">{t.login}</Button>
        <Button variant="outline">{t.register}</Button>
      </div>
    </div>
  );
}
