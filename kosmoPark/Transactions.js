import React from 'react';
import { useAppContext } from './AppContext';

const Transactions = () => {
  const { transactions, deleteTransaction, user } = useAppContext();
  return (
    <div style={styles.transactionsContainer}>
      <h2 style={styles.title}>Transactions</h2>
      <ul>
        {transactions.map((item) => (
          <li key={item.id} style={styles.transactionItem}>
            <span>{item.details}</span>
            {user.role === 'admin' && (
              <button onClick={() => deleteTransaction(item.id)}>X</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  transactionsContainer: {
    flex: 1,
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  transactionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
};

export default Transactions;
