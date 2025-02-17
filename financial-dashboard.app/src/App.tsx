import React, { useState } from 'react';
import { ThemeProvider as EmotionThemeProvider, Theme } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Dashboard from './components/Dashboard';
import { Transaction } from './types';

const emotionTheme: Theme = {
  mode: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
};

const muiTheme = createTheme({
  palette: {
    mode: emotionTheme.mode as 'light' | 'dark',
  },
});

// TODO: This would normally come from C# backend
const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 45.50,
    date: '2024-03-10',
    category: 'food',
    description: 'Grocery shopping'
  },
  {
    id: '2',
    amount: 30.00,
    date: '2024-03-09',
    category: 'transport',
    description: 'Bus fare'
  },
  {
    id: '3',
    amount: 800.00,
    date: '2024-03-08',
    category: 'housing',
    description: 'Monthly rent'
  },
  {
    id: '4',
    amount: 60.00,
    date: '2024-03-07',
    category: 'leisure',
    description: 'Movie night'
  },
  {
    id: '5',
    amount: 120.00,
    date: '2024-03-06',
    category: 'health',
    description: 'Pharmacy'
  }
];

function App() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const balance = 2500.00; // TODO: This would come from backend

  const handleAddTransaction = () => {
    // TODO: This would open a modal/form to add a new transaction
    // TODO: The actual implementation would send data to C# backend
    console.log('Add transaction clicked');
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <EmotionThemeProvider theme={emotionTheme}>
        <CssBaseline />
        <Dashboard
          transactions={transactions}
          balance={balance}
          onAddTransaction={handleAddTransaction}
        />
      </EmotionThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;