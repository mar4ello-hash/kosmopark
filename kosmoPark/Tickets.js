import React, { useState } from 'react';
import { useAppContext } from './AppContext';

const Tickets = () => {
  const { tickets, incrementTickets, addTransaction, resetTickets } = useAppContext();
  const [ticketType, setTicketType] = useState('');

  const handleSubmit = () => {
    if (tickets.quantity > 0 && ticketType) {
      addTransaction(`Bought ${tickets.quantity} ${ticketType} tickets`);
      resetTickets();
      setTicketType('');
    }
  };

  return (
    <div style={styles.ticketsContainer}>
      <h2 style={styles.title}>TICKETS: {tickets.quantity}</h2>
      <input
        style={styles.input}
        placeholder="Ticket type"
        value={ticketType}
        onChange={(e) => setTicketType(e.target.value)}
      />
      <div style={styles.buttonRow}>
        <button onClick={() => incrementTickets(1)}>+1</button>
        <button onClick={() => incrementTickets(10)}>+10</button>
      </div>
      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  );
};

const styles = {
  ticketsContainer: {
    flex: 1,
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  input: {
    border: '1px solid #000',
    padding: '10px',
    marginBottom: '10px',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0',
  },
};

export default Tickets;
