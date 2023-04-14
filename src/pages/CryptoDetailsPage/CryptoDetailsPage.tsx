import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ICryptoItem } from "../HomePage/HomePage";
import { floatToFixed } from "../../helpers/FloatToFixed";
import CurrencyChart from "../../components/CurrencyChart/CurrencyChart";

function CryptoDetails() {
  const { id } = useParams<{id: string}>();
  const [crypto, setCrypto] = useState<ICryptoItem | null>(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.coincap.io/v2/assets/${id}`)
      .then((response) => setCrypto(response.data.data))
      .catch((error) => console.log(error));

    axios
      .get(`https://api.coincap.io/v2/assets/${id}/history?interval=d1`)
      .then((response) => setHistory(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!crypto) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{crypto.name}</h1>
      <p>Rank: {crypto.rank}</p>
      <p>Price (USD): {floatToFixed(crypto.priceUsd, 2)}</p>
      <p>Market Cap (USD): {floatToFixed(crypto.marketCapUsd, 2)}</p>
      <p>Change (24Hr): {floatToFixed(crypto.changePercent24Hr, 2)}%</p>
      <CurrencyChart history = {history}/>
    </div>
  );
}

export default CryptoDetails;
