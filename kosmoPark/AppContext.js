import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

const AppContextProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([
    { id: 1, details: 'Bought 2 ADULT tickets' },
    { id: 2, details: 'Bought 1 CHILD ticket' },
  ]);
  const [tickets, setTickets] = useState({ type: '', quantity: 0 });
  const [user] = useState({ name: 'Admin User', role: 'admin' });

  const addTransaction = (details) => {
    setTransactions([...transactions, { id: transactions.length + 1, details }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const incrementTickets = (amount) => {
    setTickets({ ...tickets, quantity: tickets.quantity + amount });
  };

  const resetTickets = () => {
    setTickets({ type: '', quantity: 0 });
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        tickets,
        user,
        addTransaction,
        deleteTransaction,
        incrementTickets,
        resetTickets,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
