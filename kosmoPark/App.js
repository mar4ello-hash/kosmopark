import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

const AppContext = React.createContext();

class AppProvider extends React.Component {
  state = {
    transactions: [],
    tickets: { type: '', quantity: 0 },
    user: { name: '', role: 'admin' },
    souvenirs: [{ id: 1, name: 'T-shirt', price: 10 }, { id: 2, name: 'Mug', price: 5 }]
  };

  addTransaction = (details) => {
    this.setState((prevState) => ({
      transactions: [...prevState.transactions, { id: Date.now(), details }]
    }));
  };

  deleteTransaction = (id) => {
    this.setState((prevState) => ({
      transactions: prevState.transactions.filter(transaction => transaction.id !== id)
    }));
  };

  incrementTickets = (amount) => {
    this.setState((prevState) => ({
      tickets: { ...prevState.tickets, quantity: prevState.tickets.quantity + amount }
    }));
  };

  resetTickets = () => {
    this.setState({ tickets: { type: '', quantity: 0 } });
  };

  render() {
    const { children } = this.props;
    return (
      <AppContext.Provider
        value={{
          transactions: this.state.transactions,
          tickets: this.state.tickets,
          user: this.state.user,
          souvenirs: this.state.souvenirs,
          addTransaction: this.addTransaction,
          deleteTransaction: this.deleteTransaction,
          incrementTickets: this.incrementTickets,
          resetTickets: this.resetTickets,
        }}>
        {children}
      </AppContext.Provider>
    );
  }
}

const withAppContext = (Component) => {
  return function ContextComponent(props) {
    return (
      <AppContext.Consumer>
        {(context) => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
};

const Transactions = (props) => {
  const { transactions, deleteTransaction, user } = props.context;
  return (
    <View style={styles.transactionsContainer}>
      <Text style={styles.heading}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text>{item.details}</Text>
            {user.role === 'admin' && (
              <Button title="X" onPress={() => deleteTransaction(item.id)} />
            )}
          </View>
        )}
      />
    </View>
  );
};

const Tickets = (props) => {
  const [ticketType, setTicketType] = useState('');
  const { tickets, incrementTickets, resetTickets, addTransaction } = props.context;

  const handleSubmit = () => {
    if (ticketType) {
      addTransaction(`Ticket: ${ticketType}`);
      setTicketType('');
    }
  };

  return (
    <View style={styles.ticketsContainer}>
      <TextInput
        value={ticketType}
        onChangeText={setTicketType}
        placeholder="Enter ticket type"
        style={styles.input}
      />
      <View style={styles.buttonRow}>
        <Button title="+1 Ticket" onPress={() => incrementTickets(1)} />
        <Button title="+10 Tickets" onPress={() => incrementTickets(10)} />
        <Button title="Submit" onPress={handleSubmit} />
        <Button title="Reset Tickets" onPress={resetTickets} />
      </View>
      <Text>{`Tickets: ${tickets.quantity}`}</Text>
    </View>
  );
};

const Souvenirs = (props) => {
  const { souvenirs, addTransaction } = props.context;
  const handleBuy = (item) => {
    addTransaction(`Souvenir: ${item.name} - $${item.price}`);
  };

  return (
    <View style={styles.souvenirsContainer}>
      <FlatList
        data={souvenirs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.souvenirItem}>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Buy" onPress={() => handleBuy(item)} />
          </View>
        )}
      />
    </View>
  );
};

const TransactionsWithContext = withAppContext(Transactions);
const TicketsWithContext = withAppContext(Tickets);
const SouvenirsWithContext = withAppContext(Souvenirs);

const Tab = createBottomTabNavigator();

const MainComponent = () => (
  <Tab.Navigator>
    <Tab.Screen name="Sell Tickets" component={TicketsWithContext} />
    <Tab.Screen name="Buy Souvenirs" component={SouvenirsWithContext} />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const App = () => (
  <AppProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainComponent} />
        <Stack.Screen name="Transactions" component={TransactionsWithContext} />
      </Stack.Navigator>
    </NavigationContainer>
  </AppProvider>
);

const styles = StyleSheet.create({
  transactionsContainer: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  ticketsContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  souvenirsContainer: {
    flex: 1,
    padding: 20,
  },
  souvenirItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default App;
