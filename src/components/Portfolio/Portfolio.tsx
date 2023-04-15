import React from "react";
import styles from "./Portfolio.module.scss";

const Portfolio = ({portfolio, setIsPortfolioOpened, setPortfolio}) => {

    const handleModalClose = () => {
        setIsPortfolioOpened(false);
    }

    const handleRemoveFromPortfolio = (i: number) => {
        const updatedPortfolio = [...portfolio];
        updatedPortfolio.splice(i, 1);
        setPortfolio(updatedPortfolio);
    }
    
    return (
        <div className={styles.overlay}>    
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Portfolio
                    <button className={styles.btn} onClick={handleModalClose}>x</button>
                </h2>
                {portfolio.length ? (
                    <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>Change (24h)</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.map((crypto, i) => (
                            <tr key={crypto.id}>
                                <td>{crypto.name}</td>
                                <td>{crypto.symbol}</td>
                                <td>{`$${(parseFloat(crypto.priceUsd) * parseFloat(crypto.amount)).toFixed(2)}`}</td>
                                <td>{`${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`}</td>
                                <td>{crypto.amount}</td>
                                <td>
                                <button className={styles.btn} onClick={() => handleRemoveFromPortfolio(i)}>
                                Remove
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                ) : (
                <div className={styles.noItemsPlaceholder}>There no items in portfolio yet.</div>
                    )}                
            </div>
        </div>    
    );
}

export default Portfolio;