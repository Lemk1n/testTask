import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HomePage.module.scss";
import classNames from "classnames";
import Portfolio from "../../components/Portfolio/Portfolio";
import { Link } from "react-router-dom";

export interface ICryptoItem {
  amount: string;
  id: number;
  rank: string;
  name: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  changePercent24Hr: string;
}

const HomePage = () => {

    const [cryptos, setCryptos] = useState([]);
    const [portfolio, setPortfolio] = useState([...JSON.parse(localStorage.getItem('portfolio') || '')]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState<ICryptoItem | null>(null);
    const [amount, setAmount] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(
          'https://api.coincap.io/v2/assets?limit=10'
        );
        setCryptos(result.data.data);
      };
      fetchData();
      const intervalId = setInterval(fetchData, 10000); // Refresh data every 10 seconds
      return () => clearInterval(intervalId);
    }, []);
  
  
    useEffect(() => {
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }, [portfolio]);
  
    const handleAddToPortfolio = (crypto) => {
      setSelectedCrypto(crypto);
      setShowModal(true);
    };
  
    const handleModalClose = () => {
      setSelectedCrypto(null);
      setAmount("");
      setShowModal(false);
    };
  
    const handleAmountChange = (event) => {
      setAmount(event.target.value);
    };
  
    const handleConfirmAdd = () => {
      if (amount === '') {
        alert('Please enter an amount.');
        return;
      }
      const crypto = { ...selectedCrypto };
      crypto.amount = amount;
      setPortfolio([...portfolio, crypto]);
      handleModalClose();
    };

    return (
        <div className={styles.container}>
            <table className={styles.table}>
            <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Price (USD)</th>
                <th>Market Cap (USD)</th>
                <th>Change (24Hr)</th>
                <th>Add to Portfolio</th>
            </tr>
            </thead>
            <tbody>
            {cryptos.map((crypto: ICryptoItem) => (
                <tr key={crypto.id}>
                <td>{crypto.rank}</td>
                <td>
                    <Link to={`/cryptos/${crypto.id}`}>{crypto.name}</Link>
                </td>
                <td>{crypto.symbol}</td>
                <td>{`$${parseFloat(crypto.priceUsd).toFixed(2)}`}</td>
                <td>{`$${parseFloat(crypto.marketCapUsd).toFixed(2)}`}</td>
                <td>{`${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`}</td>
                <td>
                    <button onClick={() => handleAddToPortfolio(crypto)}>
                    Add
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        <Portfolio portfolio = {portfolio}/>
        {showModal && (
            <div className={styles.modalDialog}>
            <div className={styles.modalHeader}>
                <h1 className={styles.modalTitle}>Add to Portfolio</h1>
                <button className={styles.btn} onClick={handleModalClose}>x</button>
            </div>
            <div className={styles.modalBody}>
            {selectedCrypto && (                
                <form className={styles.modalForm}>                
                    <label>
                        Amount of {selectedCrypto.name}
                    </label>
                    <input
                        type="number"
                        step="0.0001"
                        min="0"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleAmountChange}
                    />                
                </form>
            )}
            </div>
            <div className={styles.modalFooter}>
            <button className={classNames(styles.btn, styles.btnSecondary)} onClick={handleModalClose}>
                Cancel
            </button>
            <button className={classNames(styles.btn, styles.btnPrimary)} onClick={handleConfirmAdd}>
                Confirm
            </button>
            </div>
        </div>
        )}        
    </div>
    )
}

export default HomePage;