<template>
  <div class="container mt-5">
    <h1 class="mb-4">Kasir App</h1>

    <!-- Daftar Item -->
    <div class="row">
      <div class="col-md-6">
        <h2>Daftar Item</h2>
        <ul class="list-group">
          <li v-for="item in items" :key="item.id" class="list-group-item" @click="addItemToCart(item)">
            {{ item.name }} - {{ item.price }}
          </li>
        </ul>
      </div>

      <!-- Keranjang Belanja -->
      <div class="col-md-6">
        <h2>Keranjang Belanja</h2>
        <ul class="list-group">
          <li v-for="cartItem in cart" :key="cartItem.id" class="list-group-item">
            {{ cartItem.name }} - {{ cartItem.quantity }} pcs
            <button class="btn btn-sm btn-danger float-right" @click="removeItemFromCart(cartItem)">Hapus</button>
          </li>
        </ul>
        <div class="mt-3">
          Total: {{ total }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: 'Kemeja', price: 100000 },
        { id: 2, name: 'Celana', price: 150000 },
        { id: 3, name: 'Topi', price: 50000 }
      ],
      cart: [],
    };
  },
  computed: {
    total() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  methods: {
    addItemToCart(item) {
      const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({...item, quantity: 1});
      }
    },
    removeItemFromCart(cartItem) {
      const index = this.cart.findIndex(item => item.id === cartItem.id);
      if (index !== -1) {
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          this.cart.splice(index, 1);
        }
      }
    }
  }
};
</script>

<style>
/* CSS Bootstrap atau gaya kustom Anda dapat ditempatkan di sini */
</style>
