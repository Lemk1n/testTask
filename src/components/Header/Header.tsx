import { useState, useEffect } from 'react';
import axios from 'axios';
import { floatToFixed } from '../../helpers/FloatToFixed';
import styles from './Header.module.scss';


const publicUrl = process.env.PUBLIC_URL;

interface ICoin {
    id: number;
    name: string;
    symbol: string;
    priceUsd: string;
}

const Header = ({setIsPortfolioOpened}) => {
  const [topCoins, setTopCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    const fetchTopCoins = async () => {
      const response = await axios.get(
        'https://api.coincap.io/v2/assets?limit=3&sort=rank'
      );
      const coinData = response.data.data;
      const coins = coinData.map((coin: ICoin) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        priceUsd: coin.priceUsd,
      }));
      setTopCoins(coins);
    };    
    fetchTopCoins();
    const intervalId = setInterval(fetchTopCoins, 10000); // Refresh data every 10 seconds
      return () => clearInterval(intervalId);
  }, []);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Cryptocurrency Table</h1>
      <div className={styles.topCoins}>
        {topCoins.map((coin) => (
          <div className={styles.coin} key={coin.id}>
            <span className={styles.name}>{coin.name}</span>
            <span className={styles.symbol}>{coin.symbol}</span>
            <span className={styles.priceUsd}>${floatToFixed(coin.priceUsd, 2)}</span>
          </div>
        ))}
      </div>
      <img className={styles.icon} src={`${publicUrl}/assets/portfolio.svg`} alt="Portfolio" onClick={() => setIsPortfolioOpened(true)} />
    </header>
  );
};

export default Header;
