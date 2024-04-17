<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Kasir App</h1>

    <div class="row">
      <div class="col-lg-6">
        <h2>Daftar Item</h2>
        <ul class="list-group">
          <li v-for="item in items" :key="item.id" class="list-group-item cursor-pointer" @click="addItemToCart(item)">
            {{ item.name }} - {{ item.price }}
          </li>
        </ul>
      </div>

      <div class="col-lg-6 bg-light p-4">
        <h2 class="mb-4">Keranjang Belanja</h2>
        <ul class="list-group">
          <li v-for="cartItem in cart" :key="cartItem.id"
            class="list-group-item d-flex justify-content-between align-items-center">
            {{ cartItem.name }} - {{ cartItem.quantity }} pcs
            <button class="btn btn-danger btn-sm" @click="removeItemFromCart(cartItem)">Hapus</button>
          </li>
        </ul>
        <div class="mt-3">
          <span class="font-weight-bold">Total: Rp {{ total }}</span>
        </div>
        <button v-if="cart.length > 0" class="btn btn-primary mt-3" @click="showInvoiceModal">Selesaikan
          Pembayaran</button>
      </div>
    </div>

    <!-- Invoice Modal -->
    <div class="modal" id="invoiceModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Invoice</h5>
            <button type="button" class="close" @click="hideInvoiceModal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
<<<<<<< HEAD
          <div class="modal-body" id="printableArea">
            <h4>Invoice Details</h4>
            <p>Date: {{ getCurrentDateTime }}</p>
            <p>Items Purchased:</p>
            <ul>
              <li v-for="cartItem in cart" :key="cartItem.id">
=======
          <div class="modal-body">
            <ul class="list-group">
              <li v-for="cartItem in cart" :key="cartItem.id"
                class="list-group-item d-flex justify-content-between align-items-center">
>>>>>>> 6d1ace3f6aa4537741342d76ac686160193357f0
                {{ cartItem.name }} - {{ cartItem.quantity }} pcs
              </li>
            </ul>
            <p>Total: Rp {{ total }}</p>
            <p>Payment Amount: Rp {{ paymentAmount }}</p>
            <p>Change: Rp {{ change }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideInvoiceModal">Tutup</button>
            <button type="button" class="btn btn-primary" @click="printInvoice">Cetak</button>
          </div>
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
      paymentAmount: 0,
      change: 0
    };
  },
  computed: {
    total() {
      return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    getCurrentDateTime() {
      const date = new Date();
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
  },
  methods: {
    addItemToCart(item) {
      const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
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
    },
    showInvoiceModal() {
      const modal = document.getElementById('invoiceModal');
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');

      this.paymentAmount = 0;
      this.change = 0;
    },
    hideInvoiceModal() {
      const modal = document.getElementById('invoiceModal');
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    },
    printInvoice() {
      const printContents = document.getElementById('printableArea').innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    },
    calculateChange() {
      this.change = this.paymentAmount - this.total;
    }
  }
};
</script>

<style>
/* CSS Bootstrap atau gaya kustom Anda dapat ditempatkan di sini */
</style>