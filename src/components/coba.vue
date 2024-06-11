<template>
  <div class="container-fluid mt-5 bg apasto">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-md-3 col-lg-2 sidebar">
        <h1 class="mb-4 text-start">Kasir App</h1>
        <p class="text-start">Admin: {{ adminName }}</p>
      </div>

      <div class="col-md-9 col-lg-10 offset-md-3 offset-lg-2 content">
        <div class="row">
          <div class="col-lg-6">
            <h2>Daftar Item</h2>
            <div class="d-flex flex-wrap mb-4">
              <button
                v-for="item in items"
                :key="item.id"
                class="btn btn-info m-2"
                @click="addItemToCart(item)"
              >
                {{ item.name }} - Rp {{ item.price }}
              </button>
            </div>
            <button class="btn btn-primary" @click="showAddItemModal">
              Tambah Item Baru
            </button>
          </div>

          <div class="col-lg-6 p-4 keranjang">
            <h2 class="mb-4">Keranjang Belanja</h2>
            <ul class="list-group mb-3">
              <li
                v-for="cartItem in cart"
                :key="cartItem.id"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {{ cartItem.name }} - {{ cartItem.quantity }} pcs
                <button
                  class="btn btn-danger btn-sm"
                  @click="removeItemFromCart(cartItem)"
                >
                  Hapus
                </button>
              </li>
            </ul>
            <div>
              <span class="font-weight-bold">Total: Rp {{ total }}</span>
            </div>
            <div class="mt-3">
              <label for="paymentAmount">Jumlah Pembayaran:</label>
              <input
                type="number"
                id="paymentAmount"
                v-model="paymentAmount"
                class="form-control"
              />
            </div>
            <div class="mt-3">
              <span class="font-weight-bold">Kembalian: Rp {{ change }}</span>
            </div>
            <button
              v-if="cart.length > 0"
              class="btn btn-primary mt-3"
              @click="showInvoiceModal"
            >
              Selesaikan Pembayaran
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Item Modal -->
  <div
    class="modal fade"
    id="addItemModal"
    tabindex="-1"
    aria-labelledby="addItemModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="addItemModalLabel">Tambah Item Baru</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-3">
            <label for="itemId">ID Barang:</label>
            <input
              type="text"
              class="form-control"
              id="itemId"
              v-model="newItem.id"
            />
          </div>
          <div class="form-group mb-3">
            <label for="itemName">Nama Barang:</label>
            <input
              type="text"
              class="form-control"
              id="itemName"
              v-model="newItem.name"
            />
          </div>
          <div class="form-group mb-3">
            <label for="itemPrice">Harga Barang:</label>
            <input
              type="number"
              class="form-control"
              id="itemPrice"
              v-model="newItem.price"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Tutup
          </button>
          <button type="button" class="btn btn-success" @click="addItem">
            Tambahkan
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Invoice Modal -->
  <div
    class="modal fade"
    id="invoiceModal"
    tabindex="-1"
    aria-labelledby="invoiceModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content" id="invoiceModalContent">
        <div class="modal-header bg-primary text-white">
          <h5 class="modal-title" id="invoiceModalLabel">Invoice</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="list-group mb-3">
            <li
              v-for="cartItem in cart"
              :key="cartItem.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              {{ cartItem.name }} - {{ cartItem.quantity }} pcs
            </li>
          </ul>
          <p>Total: Rp {{ total }}</p>
          <p>Jumlah Pembayaran: Rp {{ paymentAmount }}</p>
          <p>Kembalian: Rp {{ change }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Tutup
          </button>
          <button type="button" class="btn btn-primary" @click="printInvoice">
            Cetak
          </button>
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
        { id: 1, name: "Kemeja", price: 100000 },
        { id: 2, name: "Celana", price: 150000 },
        { id: 3, name: "Topi", price: 50000 },
        { id: 4, name: "T-shirt", price: 100000 },
        { id: 5, name: "Sepatu", price: 200000 },
      ],
      cart: [],
      paymentAmount: 0,
      change: 0,
      newItem: {
        id: "",
        name: "",
        price: "",
      },
      addItemModal: null,
      invoiceModal: null,
      adminName: "Ezra", // Ganti dengan nama admin yang sesuai
    };
  },
  computed: {
    total() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    addItem() {
      if (this.newItem.id && this.newItem.name && this.newItem.price) {
        this.items.push({ ...this.newItem });
        this.newItem = { id: "", name: "", price: "" };
        this.addItemModal.hide();
      } else {
        alert("Silakan isi semua informasi item");
      }
    },
    addItemToCart(item) {
      const cartItem = this.cart.find((cartItem) => cartItem.id === item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },
    removeItemFromCart(cartItem) {
      const index = this.cart.findIndex((item) => item.id === cartItem.id);
      if (index !== -1) {
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          this.cart.splice(index, 1);
        }
      }
    },
    showAddItemModal() {
      this.addItemModal.show();
    },
    showInvoiceModal() {
      this.calculateChange();
      this.invoiceModal.show();
    },
    calculateChange() {
      this.change = this.paymentAmount - this.total;
    },
    printInvoice() {
      // Dapatkan elemen modal invoice
      const invoiceContent = document.getElementById(
        "invoiceModalContent"
      ).innerHTML;

      // Buat jendela baru untuk mencetak
      const printWindow = window.open("", "_blank");

      // Tulis konten modal ke jendela baru
      printWindow.document.write(`
              <html>
              <head>
                  <title>Invoice</title>
                  <style>
                      /* Tambahkan gaya CSS di sini jika diperlukan */
                  </style>
              </head>
              <body>
                  ${invoiceContent}
              </body>
              </html>
          `);

      // Jalankan perintah cetak
      printWindow.document.close();
      printWindow.print();

      // Tutup jendela setelah mencetak
      printWindow.close();
    },
  },
  mounted() {
    this.addItemModal = new bootstrap.Modal(
      document.getElementById("addItemModal")
    );
    this.invoiceModal = new bootstrap.Modal(
      document.getElementById("invoiceModal")
    );
  },
};
</script>

<style>
/* Tetapkan gaya default */
body {
  background-color: #faf3f0; /* Warna latar belakang */
  color: black; /* Warna teks */
}

.keranjang {
  background-color: #c9bab3; /* Warna latar belakang */
  color: black; /* Warna teks */
  border-radius: 10px; /* Membuat border membulat */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Menambahkan bayangan */
  padding: 20px;
}

.container-fluid {
  padding-left: 0;
  padding-right: 0;
}

.row {
  flex-wrap: wrap;
}

.col-md-3,
.col-lg-2 {
  flex-basis: 25%;
}

.col-md-9,
.col-lg-10 {
  flex-basis: 75%;
}

/* Make the sidebar sticky */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px; /* adjust the width to your liking */
  height: 100vh; /* take up the full height of the page */
  padding-top: 20px;
  padding-left: 20px;
  z-index: 1;
  background-color: #3d3c42;
  color: white;
  box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* add this to make the sidebar scrollable if the content exceeds the height */
}
.main-content {
  margin-left: 250px;
  padding: 20px;
}

.offset-md-3 {
  margin-left: 25%;
  padding-left: 20px; /* Atur padding agar sejajar dengan sidebar */
}

.offset-lg-2 {
  margin-left: 16.6667%;
  padding-left: 20px; /* Atur padding agar sejajar dengan sidebar */
}

.modal-content {
  border-radius: 10px; /* Sudut melengkung */
  padding: 20px;
}

.modal-header {
  background-color: #007bff; /* Warna latar belakang header */
  color: #fff; /* Warna teks header */
  border-bottom: none; /* Hapus garis bawah header */
  flex-wrap: wrap;
}

.modal-footer {
  border-top: none; /* Hapus garis atas footer */
  flex-wrap: wrap;
}

/* Media queries untuk tata letak flex pada layar kecil */
@media (max-width: 991.98px) {
  .col-lg-6 {
    flex-basis: 100%;
  }
  .main-content {
    width: calc(100% - 250%);
  }
}

@media (max-width: 767.98px) {
  .sidebar {
    position: relative;
    width: 100%;
    padding-top: 10px;
    padding-left: ;
  }
}

/* Add some styles to the list group items */
.list-group-item {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

/* Add some styles to the input fields */
.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
