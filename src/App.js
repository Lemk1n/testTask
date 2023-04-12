import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [portfolio, setPortfolio] = useState(
    JSON.parse(localStorage.getItem('portfolio')) || []
  );
  const [showModal, setShowModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [amount, setAmount] = useState('');

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
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const handleAddToPortfolio = (crypto) => {
    setSelectedCrypto(crypto);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedCrypto(null);
    setAmount('');
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
    <div className="container">
      <h1>Cryptocurrency Prices</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change (24h)</th>
            <th>Add to Portfolio</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td>{crypto.name}</td>
              <td>{crypto.symbol}</td>
              <td>{`$${parseFloat(crypto.priceUsd).toFixed(2)}`}</td>
              <td>{`${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleAddToPortfolio(crypto)}
                >
                  Add
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Portfolio</h2>
      <Table striped bordered hover>
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
  </Table>
  <Modal show={showModal} onHide={handleModalClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add {selectedCrypto && selectedCrypto.name} to Portfolio</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            step="0.0001"
            min="0"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleModalClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirmAdd}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
</div>
);
}

export default App;
