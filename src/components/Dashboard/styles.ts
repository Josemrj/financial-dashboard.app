import styled from '@emotion/styled';
import { Button, Paper } from '@mui/material';

declare module '@emotion/react' {
  export interface Theme {
    mode: 'light' | 'dark';
  }
}

export const Container = styled.main`
  min-height: 100vh;
  background-color: ${props => props.theme.mode === 'dark' ? '#111827' : '#F9FAFB'};
  padding: 1.5rem;
`;

export const Content = styled.section`
  max-width: 1280px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1F2937'};
  margin: 0;
`;

export const AddButton = styled(Button)`
  && {
    background-color: #2563EB;
    color: white;
    text-transform: none;
    padding: 0.5rem 1rem;
    
    &:hover {
      background-color: #1D4ED8;
    }
  }
`;

export const StatsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatCard = styled(Paper)`
  && {
    padding: 1.5rem;
    background-color: ${props => props.theme.mode === 'dark' ? '#1F2937' : '#ffffff'};
  }
`;

export const StatContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconWrapper = styled.span<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  border-radius: 9999px;
  background-color: ${props => props.color}20;
  color: ${props => props.color};
`;

export const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StatLabel = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.mode === 'dark' ? '#9CA3AF' : '#6B7280'};
  margin: 0;
`;

export const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1F2937'};
  margin: 0;
  text-transform: capitalize;
`;

export const ChartsGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ChartCard = styled(Paper)`
  && {
    padding: 1.5rem;
    background-color: ${props => props.theme.mode === 'dark' ? '#1F2937' : '#ffffff'};
  }
`;

export const ChartTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1F2937'};
`;

export const ChartContainer = styled.div`
  height: 320px;
`;

export const TransactionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TransactionItem = styled(Paper)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background-color: ${props => props.theme.mode === 'dark' ? '#374151' : '#F9FAFB'};
  }
`;

export const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TransactionDescription = styled.span`
  font-weight: 500;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1F2937'};
`;

export const TransactionDate = styled.span`
  font-size: 0.875rem;
  color: ${props => props.theme.mode === 'dark' ? '#9CA3AF' : '#6B7280'};
`;

export const TransactionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CategoryBadge = styled.span<{ color: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: ${props => props.color};
  color: white;
`;

export const Amount = styled.span`
  font-weight: 600;
  color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#1F2937'};
`;