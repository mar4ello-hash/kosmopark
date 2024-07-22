import React from 'react';
import Transactions from './Transactions';
import Souvenirs from './Souvenirs';

const SouvenirsScreen = () => (
  <div style={styles.container}>
    <Transactions />
    <Souvenirs />
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
};

export default SouvenirsScreen;
