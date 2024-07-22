import React from 'react';

const Workshops = () => (
  <div style={styles.workshopsContainer}>
    <h2 style={styles.title}>Workshops</h2>
    <div style={styles.grid}>
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} style={styles.workshopItem} />
      ))}
    </div>
    <button>ADD</button>
  </div>
);

const styles = {
  workshopsContainer: {
    flex: 1,
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  workshopItem: {
    width: '80px',
    height: '80px',
    border: '1px solid #000',
    margin: '5px',
  },
};

export default Workshops;
