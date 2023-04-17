import { useState, useEffect, useMemo } from 'react';
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

const Header = ({setIsPortfolioOpened, portfolio}) => {
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

  const portfolioTotalPrice = useMemo(() => {
    let startTotal = 0;
    let total = 0;
    if(!portfolio.length) {
      return {};
    }
    portfolio.forEach((currency) => {
      total += currency.priceUsd * currency.amount;
      startTotal += currency.startPrice * currency.amount;
    })
    return { total, startTotal };
  }, [portfolio]);

  const priceDifference = useMemo(() => {
    const { total, startTotal } = portfolioTotalPrice;
    const difference = total - startTotal;
    const percentage = 100 * difference / total;
    const sign = difference > 0 && "+";
    return { sign, difference, percentage };
  }, [portfolioTotalPrice]);

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
      <div className={styles.portfolioWrapper}>
        <img className={styles.icon} src={`${publicUrl}/assets/portfolio.svg`} alt="Portfolio" onClick={() => setIsPortfolioOpened(true)} />
        {portfolio.length && (
          <>
            <div>${portfolioTotalPrice.total.toFixed(2)}</div>
            <div>{priceDifference.sign}{priceDifference.difference.toFixed(2)} ({priceDifference.percentage.toFixed(2)}%)</div>
          </>
        )}       
      </div>
    </header>
  );
};

export default Header;
