import React from 'react';
import Transactions from './Transactions';
import Tickets from './Tickets';
import Workshops from './Workshops';

const MainScreen = () => (
  <div style={styles.container}>
    <Transactions />
    <div>
      <Tickets />
      <Workshops />
    </div>
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
};

export default MainScreen;
