import React from "react";
import styles from "./Portfolio.module.scss";

const Portfolio = ({portfolio}) => {
    return (
        <>
            <h2>Portfolio</h2>
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
                    {portfolio.map((crypto) => (
                        <tr key={crypto.id}>
                            <td>{crypto.name}</td>
                            <td>{crypto.symbol}</td>
                            <td>{`$${parseFloat(crypto.priceUsd).toFixed(2)}`}</td>
                            <td>{`${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`}</td>
                            <td>{crypto.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Portfolio;