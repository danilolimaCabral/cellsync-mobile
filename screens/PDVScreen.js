import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button, List, Divider, Surface, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function PDVScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  const produtos = [
    { id: 1, nome: 'iPhone 13 Pro', preco: 6999.00, estoque: 5, categoria: 'Smartphone' },
    { id: 2, nome: 'Samsung Galaxy S23', preco: 4599.00, estoque: 8, categoria: 'Smartphone' },
    { id: 3, nome: 'Xiaomi Redmi Note 12', preco: 1899.00, estoque: 12, categoria: 'Smartphone' },
    { id: 4, nome: 'Capinha Transparente', preco: 29.90, estoque: 50, categoria: 'Acessório' },
    { id: 5, nome: 'Película de Vidro', preco: 19.90, estoque: 80, categoria: 'Acessório' },
  ];

  const addToCart = (produto) => {
    const existing = cart.find(item => item.id === produto.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...produto, quantidade: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantidade + delta;
        return newQty > 0 ? { ...item, quantidade: newQty } : item;
      }
      return item;
    }).filter(item => item.quantidade > 0));
  };

  const total = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  const filteredProdutos = produtos.filter(p =>
    p.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Barra de busca moderna */}
      <Surface style={styles.searchSection} elevation={4}>
        <Searchbar
          placeholder="🔍 Buscar produto ou código..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#8b5cf6"
        />
      </Surface>

      {/* Lista de produtos com cards modernos */}
      <ScrollView style={styles.productsSection}>
        {filteredProdutos.map(produto => (
          <Surface key={produto.id} style={styles.productCard} elevation={2}>
            <TouchableOpacity onPress={() => addToCart(produto)}>
              <View style={styles.productContent}>
                <View style={styles.productInfo}>
                  <View style={styles.productHeader}>
                    <Title style={styles.productName}>{produto.nome}</Title>
                    <Chip 
                      mode="flat" 
                      style={styles.categoryChip}
                      textStyle={styles.categoryText}
                    >
                      {produto.categoria}
                    </Chip>
                  </View>
                  <View style={styles.productDetails}>
                    <LinearGradient
                      colors={['#10b981', '#059669']}
                      style={styles.priceTag}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Paragraph style={styles.price}>
                        R$ {produto.preco.toFixed(2)}
                      </Paragraph>
                    </LinearGradient>
                    <View style={styles.stockBadge}>
                      <Ionicons name="cube-outline" size={14} color="#6b7280" />
                      <Paragraph style={styles.stock}> {produto.estoque} un.</Paragraph>
                    </View>
                  </View>
                </View>
                <LinearGradient
                  colors={['#8b5cf6', '#7c3aed']}
                  style={styles.addButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="add-circle" size={32} color="#fff" />
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </Surface>
        ))}
      </ScrollView>

      {/* Carrinho flutuante moderno */}
      {cart.length > 0 && (
        <Surface style={styles.cartSection} elevation={8}>
          <LinearGradient
            colors={['#f9fafb', '#ffffff']}
            style={styles.cartGradient}
          >
            <View style={styles.cartHeader}>
              <Title style={styles.cartTitle}>
                🛒 Carrinho ({cart.length})
              </Title>
            </View>
            <Divider style={styles.divider} />
            
            <ScrollView style={styles.cartItems} nestedScrollEnabled>
              {cart.map(item => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.cartItemInfo}>
                    <Paragraph style={styles.cartItemName}>{item.nome}</Paragraph>
                    <Paragraph style={styles.cartItemPrice}>
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </Paragraph>
                  </View>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity 
                      onPress={() => updateQuantity(item.id, -1)}
                      style={styles.qtyButton}
                    >
                      <Ionicons name="remove-circle" size={28} color="#ef4444" />
                    </TouchableOpacity>
                    <Paragraph style={styles.quantity}>{item.quantidade}</Paragraph>
                    <TouchableOpacity 
                      onPress={() => updateQuantity(item.id, 1)}
                      style={styles.qtyButton}
                    >
                      <Ionicons name="add-circle" size={28} color="#10b981" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            <Divider style={styles.divider} />
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Paragraph style={styles.totalLabel}>Total:</Paragraph>
                <Title style={styles.totalValue}>R$ {total.toFixed(2)}</Title>
              </View>
              <TouchableOpacity style={styles.finishButtonContainer}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  style={styles.finishButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="checkmark-circle" size={24} color="#fff" />
                  <Paragraph style={styles.finishButtonText}>
                    Finalizar Venda
                  </Paragraph>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Surface>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  searchSection: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  productsSection: {
    flex: 1,
    padding: 16,
  },
  productCard: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  productContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
  },
  categoryChip: {
    backgroundColor: '#ede9fe',
    height: 24,
  },
  categoryText: {
    fontSize: 11,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  price: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stock: {
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '500',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  cartSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '50%',
  },
  cartGradient: {
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  divider: {
    marginVertical: 12,
    backgroundColor: '#e5e7eb',
  },
  cartItems: {
    maxHeight: 150,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 13,
    color: '#10b981',
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyButton: {
    padding: 4,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    minWidth: 24,
    textAlign: 'center',
  },
  totalSection: {
    marginTop: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  finishButtonContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  finishButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
