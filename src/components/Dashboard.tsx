import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Plus, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { Transaction, CategoryTotal } from '../types';

const COLORS = {
  food: '#FF6B6B',
  transport: '#4ECDC4',
  housing: '#45B7D1',
  leisure: '#96CEB4',
  health: '#FFEEAD',
  education: '#D4A5A5',
  other: '#9FA8DA'
};

interface DashboardProps {
  transactions: Transaction[];
  balance: number;
  onAddTransaction: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, balance, onAddTransaction }) => {
  const categoryTotals: CategoryTotal[] = Object.entries(COLORS).map(([category]) => ({
    category: category as keyof typeof COLORS,
    total: transactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0)
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Financial Dashboard</h1>
          <button
            onClick={onAddTransaction}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Transaction
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <DollarSign className="text-green-600 dark:text-green-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Balance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${balance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Spending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${categoryTotals.reduce((sum, cat) => sum + cat.total, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <AlertTriangle className="text-yellow-600 dark:text-yellow-400" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Biggest Category</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                  {categoryTotals.reduce((max, cat) =>
                    cat.total > max.total ? cat : max
                  ).category}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Spending by Category
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryTotals}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {categoryTotals.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[entry.category as keyof typeof COLORS]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Recent Transactions
            </h2>
            <div className="space-y-4">
              {transactions.slice(0, 5).map(transaction => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 text-sm rounded-full"
                      style={{
                        backgroundColor: COLORS[transaction.category],
                        color: '#fff'
                      }}
                    >
                      {transaction.category}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;