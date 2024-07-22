import React from 'react';

const Souvenirs = () => {
  const souvenirs = [
    { id: 1, name: 'Mug', price: 10.0 },
    { id: 2, name: 'T-Shirt', price: 15.0 },
    { id: 3, name: 'Keychain', price: 5.0 },
  ];

  return (
    <div style={styles.souvenirsContainer}>
      <h2 style={styles.title}>Souvenirs</h2>
      <ul>
        {souvenirs.map((item) => (
          <li key={item.id} style={styles.souvenirItem}>
            <img
              src="https://via.placeholder.com/150"
              alt={item.name}
              style={styles.souvenirImage}
            />
            <span>{item.name} - ${item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  souvenirsContainer: {
    flex: 1,
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  souvenirItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  souvenirImage: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  },
};

export default Souvenirs;
