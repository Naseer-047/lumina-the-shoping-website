import { cart } from '../services/Cart.js';
import { formatCurrency } from '../utils/formatting.js';

export class CartView {
    async render() {
        const items = cart.get();
        const subtotal = cart.getTotal();
        const tax = subtotal * 0.18; // GST standard 18%
        const total = subtotal + tax;

        if (items.length === 0) {
            return `
                <div class="container mx-auto px-6 py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
                    <h1 class="text-4xl font-display font-bold mb-6 text-primary">Your Bag is Empty.</h1>
                    <p class="text-secondary mb-10 text-lg">Looks like you haven't made your choice yet.</p>
                    <a href="#/shop" class="btn-primary inline-flex">
                        Continue Shopping
                    </a>
                </div>
            `;
        }

        return `
            <div class="container mx-auto px-6 md:px-12 py-12 max-w-7xl">
                <h1 class="text-5xl font-display font-bold mb-16 text-primary tracking-tight">Shopping Bag <span class="text-2xl text-subtle font-sans font-normal ml-4 align-baseline">(${cart.getCount()} items)</span></h1>

                <div class="grid lg:grid-cols-3 gap-16 lg:gap-24">
                    <!-- Items -->
                    <div class="lg:col-span-2 space-y-12">
                        ${items.map(item => `
                            <div class="flex gap-8 pb-12 border-b border-border group">
                                <div class="w-32 h-40 bg-surface rounded-md overflow-hidden flex-shrink-0 relative">
                                    <img src="${item.imageAlt || item.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                                </div>
                                <div class="flex-grow flex flex-col justify-between py-1">
                                    <div>
                                        <div class="flex justify-between items-start mb-2">
                                            <h3 class="font-bold text-xl text-primary font-display tracking-tight">${item.name}</h3>
                                            <span class="font-medium text-primary text-lg">${formatCurrency(item.price * item.qty)}</span>
                                        </div>
                                        <p class="text-sm text-secondary">${item.categoryName || 'Product'}</p>
                                    </div>
                                    
                                    <div class="flex justify-between items-center mt-6">
                                        <div class="flex items-center border border-border rounded-full px-4 py-2 bg-surface">
                                            <button class="w-6 text-secondary hover:text-primary transition-colors update-qty" data-id="${item.id}" data-action="dec">-</button>
                                            <span class="mx-4 text-sm font-medium w-4 text-center text-primary">${item.qty}</span>
                                            <button class="w-6 text-secondary hover:text-primary transition-colors update-qty" data-id="${item.id}" data-action="inc">+</button>
                                        </div>
                                        <button class="text-xs text-subtle hover:text-red-500 transition-colors uppercase tracking-widest font-bold remove-item" data-id="${item.id}">Remove</button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Summary -->
                    <div class="h-fit sticky top-32">
                        <div class="bg-surface p-10 rounded-2xl border border-border">
                            <h3 class="font-bold text-xl mb-8 font-display text-primary">Order Summary</h3>
                            
                            <div class="space-y-6 text-sm mb-10 text-secondary">
                                <div class="flex justify-between">
                                    <span>Subtotal</span>
                                    <span class="text-primary font-medium">${formatCurrency(subtotal)}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Tax estimate (18% GST)</span>
                                    <span class="text-primary font-medium">${formatCurrency(tax)}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Shipping</span>
                                    <span class="text-green-600 font-medium">Free</span>
                                </div>
                                <div class="pt-6 border-t border-border flex justify-between font-bold text-xl text-primary font-display">
                                    <span>Total</span>
                                    <span>${formatCurrency(total)}</span>
                                </div>
                            </div>

                            <a href="#/checkout" class="btn-primary w-full flex items-center justify-center text-base">
                                Proceed to Checkout
                            </a>
                        </div>
                        
                        <div class="mt-8 text-center">
                            <p class="text-xs text-subtle">Secure Checkout • Money-back Guarantee</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {
        document.querySelectorAll('.update-qty').forEach(btn => {
            btn.onclick = (e) => {
                // BUG FIX: Removed parseInt() because IDs are strings 'p-xxx'
                const id = e.target.dataset.id; 
                const item = cart.get().find(i => i.id === id);
                
                if (item) {
                    const delta = e.target.dataset.action === 'inc' ? 1 : -1;
                    cart.updateQty(id, item.qty + delta);
                    this.refresh();
                }
            };
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.onclick = (e) => {
                const id = e.target.dataset.id;
                cart.remove(id);
                this.refresh();
            };
        });
    }

    refresh() {
        window.dispatchEvent(new Event('hashchange'));
    }
}
