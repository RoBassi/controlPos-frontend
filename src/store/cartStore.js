import { create } from 'zustand';
import api from '../api/axios';

export const useCartStore = create((set, get) => ({
  cart: [],
  total: 0,
  
  // Agregar producto al carrito
  addToCart: (product) => {
    const { cart } = get();
    // Verificamos si ya existe para sumar cantidad
    const existingItem = cart.find(item => item.id_product === product.id_product);

    if (existingItem) {
      const updatedCart = cart.map(item => 
        item.id_product === product.id_product 
          ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * item.precio_venta }
          : item
      );
      set({ cart: updatedCart });
    } else {
      // Si es nuevo, lo agregamos con cantidad 1
      set({ cart: [...cart, { ...product, cantidad: 1, subtotal: Number(product.precio_venta) }] });
    }
    get().calculateTotal();
  },

  // Quitar o restar
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter(item => item.id_product !== productId)
    }));
    get().calculateTotal();
  },

  // Actualizar cantidad manualmente
  updateQuantity: (productId, quantity) => {
      if(quantity < 1) return;
      const { cart } = get();
      const updatedCart = cart.map(item => 
          item.id_product === productId 
          ? { ...item, cantidad: quantity, subtotal: quantity * item.precio_venta } 
          : item
      );
      set({ cart: updatedCart });
      get().calculateTotal();
  },

  // Limpiar carrito
  clearCart: () => set({ cart: [], total: 0 }),

  // Calcular total
  calculateTotal: () => {
    const { cart } = get();
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
    set({ total });
  },

  // Enviar Venta al Backend
  processSale: async (metodoPagoId) => {
      const { cart, total, clearCart } = get();
      try {
          // Mapeamos el carrito para enviar solo lo que el backend necesita
          // (Aunque enviamos todo el objeto item, el backend extrae lo que necesita)
          await api.post('/ventas', {
              items: cart,
              total: total,
              metodo_pago_id: metodoPagoId
          });
          clearCart(); // Limpiamos al finalizar
          return { success: true };
      } catch (error) {
          console.error(error);
          return { success: false, msg: error.response?.data?.message || 'Error al procesar venta' };
      }
  }

}));