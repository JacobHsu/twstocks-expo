import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Platform,
  Dimensions,
} from 'react-native';
import { Search as SearchIcon, X } from 'lucide-react-native';
import { stocks } from '../data/stocks';

type StockType = 'ALL' | 'TWSE' | 'TPEx';

const windowWidth = Dimensions.get('window').width;
const ITEMS_PER_ROW = Math.floor(windowWidth / 120);

export default function StocksScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedType, setSelectedType] = useState<StockType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const filteredStocks = stocks.filter(stock => {
    const matchesType = selectedType === 'ALL' || stock.type === selectedType;
    const matchesSearch = 
      stock.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const renderStockGrid = () => {
    return (
      <View style={styles.gridContainer}>
        {filteredStocks.map((stock) => (
          <TouchableOpacity
            key={stock.id}
            style={styles.gridItem}
          >
            <View style={styles.stockHeader}>
              <Text style={styles.stockSymbol}>{stock.id}</Text>
              <View style={[
                styles.stockType,
                { backgroundColor: stock.type === 'TWSE' ? '#e0f2fe' : '#fef3c7' }
              ]}>
                <Text style={[
                  styles.stockTypeText,
                  { color: stock.type === 'TWSE' ? '#0369a1' : '#92400e' }
                ]}>
                  {stock.type === 'TWSE' ? '上市' : '上櫃'}
                </Text>
              </View>
            </View>
            <Text style={styles.stockName} numberOfLines={1}>
              {stock.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon size={20} color="#64748b" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="搜尋股票代號或名稱"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <X size={20} color="#64748b" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.typeFilters}>
        <TouchableOpacity
          style={[styles.filterButton, selectedType === 'ALL' && styles.filterButtonActive]}
          onPress={() => setSelectedType('ALL')}>
          <Text style={[styles.filterText, selectedType === 'ALL' && styles.filterTextActive]}>
            全部
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedType === 'TWSE' && styles.filterButtonActive]}
          onPress={() => setSelectedType('TWSE')}>
          <Text style={[styles.filterText, selectedType === 'TWSE' && styles.filterTextActive]}>
            上市
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedType === 'TPEx' && styles.filterButtonActive]}
          onPress={() => setSelectedType('TPEx')}>
          <Text style={[styles.filterText, selectedType === 'TPEx' && styles.filterTextActive]}>
            上櫃
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderStockGrid()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    ...Platform.select({
      web: {
        position: 'sticky',
        top: 0,
        zIndex: 1,
      },
    }),
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    padding: 8,
  },
  clearButton: {
    padding: 8,
  },
  typeFilters: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
  },
  filterText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  gridItem: {
    width: `${100 / ITEMS_PER_ROW}%`,
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  stockType: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  stockTypeText: {
    fontSize: 10,
    fontWeight: '500',
  },
  stockName: {
    fontSize: 12,
    color: '#64748b',
  },
});