import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { Searchbar, Title, Paragraph, Surface, Chip, TextInput, RadioButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function PDVScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('dinheiro');
  const [valorRecebido, setValorRecebido] = useState('');

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

  const handleFinalizarVenda = () => {
    if (cart.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione produtos antes de finalizar a venda.');
      return;
    }
    setModalVisible(true);
  };

  const confirmarVenda = () => {
    const recebido = parseFloat(valorRecebido) || 0;
    
    if (paymentMethod === 'dinheiro' && recebido < total) {
      Alert.alert('Valor insuficiente', 'O valor recebido é menor que o total da venda.');
      return;
    }

    const troco = paymentMethod === 'dinheiro' ? recebido - total : 0;

    Alert.alert(
      '✅ Venda Finalizada!',
      `Total: R$ ${total.toFixed(2)}\n` +
      `Pagamento: ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}\n` +
      (paymentMethod === 'dinheiro' ? `Troco: R$ ${troco.toFixed(2)}` : ''),
      [
        {
          text: 'OK',
          onPress: () => {
            setCart([]);
            setModalVisible(false);
            setValorRecebido('');
            setPaymentMethod('dinheiro');
          }
        }
      ]
    );
  };

  const troco = paymentMethod === 'dinheiro' 
    ? Math.max(0, (parseFloat(valorRecebido) || 0) - total)
    : 0;

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <Surface style={styles.searchSection} elevation={2}>
        <Searchbar
          placeholder="🔍 Buscar produto..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#8b5cf6"
        />
      </Surface>

      {/* Lista de produtos */}
      <ScrollView style={styles.productsSection}>
        {filteredProdutos.map(produto => (
          <Surface key={produto.id} style={styles.productCard} elevation={1}>
            <TouchableOpacity onPress={() => addToCart(produto)}>
              <View style={styles.productContent}>
                <View style={styles.productInfo}>
                  <Title style={styles.productName}>{produto.nome}</Title>
                  <View style={styles.productMeta}>
                    <View style={styles.categoryChip}>
                      <Paragraph style={styles.categoryText}>{produto.categoria}</Paragraph>
                    </View>
                    <View style={styles.stockInfo}>
                      <Ionicons name="cube-outline" size={12} color="#6b7280" />
                      <Paragraph style={styles.stock}> {produto.estoque} un.</Paragraph>
                    </View>
                  </View>
                  <Title style={styles.price}>R$ {produto.preco.toFixed(2)}</Title>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => addToCart(produto)}>
                  <LinearGradient
                    colors={['#8b5cf6', '#7c3aed']}
                    style={styles.addButtonGradient}
                  >
                    <Ionicons name="add" size={24} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Surface>
        ))}
      </ScrollView>

      {/* Carrinho */}
      {cart.length > 0 && (
        <Surface style={styles.cartSection} elevation={4}>
          <View style={styles.cartHeader}>
            <Title style={styles.cartTitle}>🛒 Carrinho ({cart.length})</Title>
          </View>
          
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
                  <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                    <Ionicons name="remove-circle" size={24} color="#ef4444" />
                  </TouchableOpacity>
                  <Paragraph style={styles.quantity}>{item.quantidade}</Paragraph>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                    <Ionicons name="add-circle" size={24} color="#10b981" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Paragraph style={styles.totalLabel}>Total:</Paragraph>
              <Title style={styles.totalValue}>R$ {total.toFixed(2)}</Title>
            </View>
            <TouchableOpacity onPress={handleFinalizarVenda}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.finishButton}
              >
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Paragraph style={styles.finishButtonText}>Finalizar Venda</Paragraph>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Surface>
      )}

      {/* Modal de Pagamento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Surface style={styles.modalContent} elevation={8}>
            <LinearGradient
              colors={['#8b5cf6', '#7c3aed']}
              style={styles.modalHeader}
            >
              <Title style={styles.modalTitle}>💳 Pagamento</Title>
            </LinearGradient>

            <View style={styles.modalBody}>
              <View style={styles.totalDisplay}>
                <Paragraph style={styles.totalDisplayLabel}>Total:</Paragraph>
                <Title style={styles.totalDisplayValue}>R$ {total.toFixed(2)}</Title>
              </View>

              <Paragraph style={styles.sectionLabel}>Forma de Pagamento:</Paragraph>
              
              <RadioButton.Group onValueChange={setPaymentMethod} value={paymentMethod}>
                <TouchableOpacity style={styles.radioOption} onPress={() => setPaymentMethod('dinheiro')}>
                  <RadioButton value="dinheiro" color="#8b5cf6" />
                  <Ionicons name="cash" size={20} color="#10b981" />
                  <Paragraph style={styles.radioLabel}>Dinheiro</Paragraph>
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioOption} onPress={() => setPaymentMethod('cartao')}>
                  <RadioButton value="cartao" color="#8b5cf6" />
                  <Ionicons name="card" size={20} color="#3b82f6" />
                  <Paragraph style={styles.radioLabel}>Cartão</Paragraph>
                </TouchableOpacity>

                <TouchableOpacity style={styles.radioOption} onPress={() => setPaymentMethod('pix')}>
                  <RadioButton value="pix" color="#8b5cf6" />
                  <Ionicons name="qr-code" size={20} color="#8b5cf6" />
                  <Paragraph style={styles.radioLabel}>PIX</Paragraph>
                </TouchableOpacity>
              </RadioButton.Group>

              {paymentMethod === 'dinheiro' && (
                <View style={styles.dinheiroSection}>
                  <TextInput
                    label="Valor Recebido"
                    value={valorRecebido}
                    onChangeText={setValorRecebido}
                    keyboardType="numeric"
                    mode="outlined"
                    left={<TextInput.Icon icon="cash" />}
                    style={styles.input}
                    activeOutlineColor="#8b5cf6"
                  />
                  {troco > 0 && (
                    <View style={styles.trocoDisplay}>
                      <Ionicons name="arrow-back-circle" size={20} color="#10b981" />
                      <Paragraph style={styles.trocoLabel}>Troco:</Paragraph>
                      <Title style={styles.trocoValue}>R$ {troco.toFixed(2)}</Title>
                    </View>
                  )}
                </View>
              )}

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Paragraph style={styles.cancelButtonText}>Cancelar</Paragraph>
                </TouchableOpacity>

                <TouchableOpacity onPress={confirmarVenda}>
                  <LinearGradient
                    colors={['#10b981', '#059669']}
                    style={styles.confirmButton}
                  >
                    <Ionicons name="checkmark-circle" size={18} color="#fff" />
                    <Paragraph style={styles.confirmButtonText}>Confirmar</Paragraph>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Surface>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  searchSection: {
    padding: 12,
    backgroundColor: '#fff',
  },
  searchbar: {
    elevation: 0,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
  },
  productsSection: {
    flex: 1,
    padding: 12,
  },
  productCard: {
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  productContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 10,
    color: '#8b5cf6',
    fontWeight: '600',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stock: {
    color: '#6b7280',
    fontSize: 11,
  },
  price: {
    color: '#10b981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    marginLeft: 12,
  },
  addButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartSection: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '45%',
    padding: 14,
  },
  cartHeader: {
    marginBottom: 10,
  },
  cartTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cartItems: {
    maxHeight: 120,
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
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  cartItemPrice: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: 'bold',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantity: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
    minWidth: 20,
    textAlign: 'center',
  },
  totalSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  finishButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  modalHeader: {
    padding: 18,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalBody: {
    padding: 18,
  },
  totalDisplay: {
    backgroundColor: '#f3f4f6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  totalDisplayLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  totalDisplayValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 8,
  },
  radioLabel: {
    fontSize: 15,
    color: '#1f2937',
  },
  dinheiroSection: {
    marginTop: 14,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  trocoDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    padding: 10,
    borderRadius: 10,
    gap: 8,
  },
  trocoLabel: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
  },
  trocoValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    flex: 1,
    textAlign: 'right',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  confirmButton: {
    flex: 1,
    flexDirection: 'row',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});
