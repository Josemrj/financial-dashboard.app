import React from 'react';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Add, AccountBalance, TrendingUp, Warning } from '@mui/icons-material';
import { Transaction, CategoryTotal } from '../../types';
import * as S from './styles';

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
    <S.Container>
      <S.Content>
        <S.Header>
          <S.Title>Financial Dashboard</S.Title>
          <S.AddButton onClick={onAddTransaction} startIcon={<Add />}>
            Add Transaction
          </S.AddButton>
        </S.Header>

        <S.StatsGrid>
          <S.StatCard>
            <S.StatContent>
              <S.IconWrapper color="#10B981">
                <AccountBalance />
              </S.IconWrapper>
              <S.StatInfo>
                <S.StatLabel>Current Balance</S.StatLabel>
                <S.StatValue>${balance.toFixed(2)}</S.StatValue>
              </S.StatInfo>
            </S.StatContent>
          </S.StatCard>

          <S.StatCard>
            <S.StatContent>
              <S.IconWrapper color="#3B82F6">
                <TrendingUp />
              </S.IconWrapper>
              <S.StatInfo>
                <S.StatLabel>Monthly Spending</S.StatLabel>
                <S.StatValue>
                  ${categoryTotals.reduce((sum, cat) => sum + cat.total, 0).toFixed(2)}
                </S.StatValue>
              </S.StatInfo>
            </S.StatContent>
          </S.StatCard>

          <S.StatCard>
            <S.StatContent>
              <S.IconWrapper color="#F59E0B">
                <Warning />
              </S.IconWrapper>
              <S.StatInfo>
                <S.StatLabel>Biggest Category</S.StatLabel>
                <S.StatValue>
                  {categoryTotals.reduce((max, cat) => 
                    cat.total > max.total ? cat : max
                  ).category}
                </S.StatValue>
              </S.StatInfo>
            </S.StatContent>
          </S.StatCard>
        </S.StatsGrid>

        <S.ChartsGrid>
          <S.ChartCard>
            <S.ChartTitle>Spending by Category</S.ChartTitle>
            <S.ChartContainer>
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
            </S.ChartContainer>
          </S.ChartCard>

          <S.ChartCard>
            <S.ChartTitle>Recent Transactions</S.ChartTitle>
            <S.TransactionsList>
              {transactions.slice(0, 5).map(transaction => (
                <S.TransactionItem key={transaction.id}>
                  <S.TransactionInfo>
                    <S.TransactionDescription>
                      {transaction.description}
                    </S.TransactionDescription>
                    <S.TransactionDate>
                      {format(new Date(transaction.date), 'MMM dd, yyyy')}
                    </S.TransactionDate>
                  </S.TransactionInfo>
                  <S.TransactionMeta>
                    <S.CategoryBadge color={COLORS[transaction.category]}>
                      {transaction.category}
                    </S.CategoryBadge>
                    <S.Amount>${transaction.amount.toFixed(2)}</S.Amount>
                  </S.TransactionMeta>
                </S.TransactionItem>
              ))}
            </S.TransactionsList>
          </S.ChartCard>
        </S.ChartsGrid>
      </S.Content>
    </S.Container>
  );
};

export default Dashboard;