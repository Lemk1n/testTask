import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ICryptoItem } from "../../pages/HomePage/HomePage";

function CryptoDetails() {
  const { id } = useParams<{id: string}>();
  const [crypto, setCrypto] = useState<ICryptoItem | null>(null);

  useEffect(() => {
    axios
      .get(`https://api.coincap.io/v2/assets/${id}`)
      .then((response) => setCrypto(response.data.data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!crypto) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{crypto.name}</h1>
      <p>Rank: {crypto.rank}</p>
      <p>Price (USD): {crypto.priceUsd}</p>
      <p>Market Cap (USD): {crypto.marketCapUsd}</p>
      <p>Change (24Hr): {crypto.changePercent24Hr}%</p>
    </div>
  );
}

export default CryptoDetails;
