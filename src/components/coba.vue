<template>
    <div class="container mt-5">
        <h1 class="mb-4 text-center">Kasir App</h1>

        <div class="row">
            <div class="col-lg-6">
                <h2>Daftar Item</h2>
                <div class="d-flex flex-wrap">
                    <button v-for="item in items" :key="item.id" class="btn btn-info"
                        style="margin-right: 10px; margin-bottom: 10px;" @click="addItemToCart(item)">
                        {{ item.name }} - {{ item.price }}
                    </button>
                </div>
                <div class="mt-4">
                    <button class="btn btn-primary" @click="showAddItemModal">Tambah Item Baru</button>
                </div>
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
                <div class="mt-3">
                    <label for="paymentAmount">Jumlah Pembayaran:</label>
                    <input type="number" id="paymentAmount" v-model="paymentAmount" class="form-control">
                </div>
                <div class="mt-3">
                    <span class="font-weight-bold">Kembalian: Rp {{ change }}</span>
                </div>
                <button v-if="cart.length > 0" class="btn btn-primary mt-3" @click="showInvoiceModal">Selesaikan
                    Pembayaran</button>
            </div>
        </div>

        <!-- Modal Tambah Item Baru -->
        <div class="modal" id="addItemModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Tambah Item Baru</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="newItemId">ID Barang:</label>
                            <input type="text" class="form-control" id="newItemId" v-model="newItem.id">
                        </div>
                        <div class="form-group">
                            <label for="newItemName">Nama Barang:</label>
                            <input type="text" class="form-control" id="newItemName" v-model="newItem.name">
                        </div>
                        <div class="form-group">
                            <label for="newItemPrice">Harga Barang:</label>
                            <input type="text" class="form-control" id="newItemPrice" v-model="newItem.price">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                        <button type="button" class="btn btn-primary" @click="addItem">Tambahkan</button>
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
                { id: 3, name: 'Topi', price: 50000 },
                { id: 4, name: 'T-shirt', price: 100000 },
                { id: 5, name: 'Sepatu', price: 200000 }
            ],
            cart: [],
            paymentAmount: 0,
            change: 0,
            newItem: {
                id: '',
                name: '',
                price: ''
            }
        };
    },
    computed: {
        total() {
            return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
    },
    methods: {
        addItem() {
            if (this.newItem.id && this.newItem.name && this.newItem.price) {
                this.items.push({ id: this.newItem.id, name: this.newItem.name, price: this.newItem.price });
                this.newItem.id = '';
                this.newItem.name = '';
                this.newItem.price = '';
                $('#addItemModal').modal('hide'); // Hide modal after adding item
            } else {
                alert('Silakan isi semua informasi item');
            }
        },
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
            const modal = new bootstrap.Modal(document.getElementById('invoiceModal'), {});
            modal.show();

            this.calculateChange();
        },
        hideInvoiceModal() {
            const modal = new bootstrap.Modal(document.getElementById('invoiceModal'), {});
            modal.hide();
        },
        printInvoice() {
            const printContents = document.getElementById('invoiceModal').innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        },
        calculateChange() {
            this.change = this.paymentAmount - this.total;
        },
        showAddItemModal() {
            $('#addItemModal').modal('show'); // Show modal for adding new item
        }
    }
}
</script>

<style>
/* CSS Bootstrap atau gaya kustom Anda dapat ditempatkan di sini */
</style>