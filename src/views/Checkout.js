import { cart } from '../services/Cart.js';
import { formatCurrency } from '../utils/formatting.js';

export class Checkout {
    async render() {
        if (cart.getCount() === 0) {
            window.location.hash = '/cart';
            return '';
        }
        
        const subtotal = cart.getTotal();
        const tax = subtotal * 0.18; // GST 18%
        const total = subtotal + tax;

        return `
            <div class="container mx-auto px-6 md:px-12 py-12 max-w-5xl">
                <div class="mb-16 text-center">
                    <h1 class="text-4xl font-display font-bold text-primary mb-4">Secure Checkout</h1>
                    <p class="text-secondary">Complete your details to place the order.</p>
                </div>

                <form id="checkout-form" class="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    <!-- Shipping Info -->
                    <div class="space-y-8">
                        <h3 class="font-display font-bold text-xl text-primary border-b border-border pb-4">Shipping Details</h3>
                        
                        <div class="grid grid-cols-2 gap-6">
                            <input type="text" name="firstName" required placeholder="First Name" class="bg-surface border border-border text-primary text-sm p-4 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all">
                            <input type="text" name="lastName" required placeholder="Last Name" class="bg-surface border border-border text-primary text-sm p-4 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all">
                        </div>
                        
                        <input type="email" name="email" required placeholder="Email Address" class="w-full bg-surface border border-border text-primary text-sm p-4 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all">
                        <input type="tel" name="phone" required placeholder="Phone Number" class="w-full bg-surface border border-border text-primary text-sm p-4 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all">
                        
                        <input type="text" name="address" required placeholder="Street Address" class="w-full bg-surface border border-border text-primary text-sm p-4 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all">
                        
                        <div class="grid grid-cols-3 gap-6">
                            <input type="text" name="city" required placeholder="City" class="col-span-1 bg-surface border border-border text-primary text-sm p-4 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all">
                            <input type="text" name="zip" required placeholder="ZIP" class="col-span-1 bg-surface border border-border text-primary text-sm p-4 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all">
                            <input type="text" name="state" required placeholder="State" class="col-span-1 bg-surface border border-border text-primary text-sm p-4 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all">
                        </div>
                    </div>

                    <!-- Payment & Summary -->
                    <div class="space-y-8">
                         <h3 class="font-display font-bold text-xl text-primary border-b border-border pb-4">Order Summary</h3>
                         
                         <div class="bg-surface border border-border p-8 rounded-2xl">
                             <div class="space-y-4 text-sm mb-8 text-secondary">
                                <div class="flex justify-between">
                                    <span>Subtotal</span>
                                    <span class="text-primary font-medium">${formatCurrency(subtotal)}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Tax (18% GST)</span>
                                    <span class="text-primary font-medium">${formatCurrency(tax)}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Shipping</span>
                                    <span class="text-green-600 font-medium">Free</span>
                                </div>
                             </div>
                             
                             <div class="border-t border-border pt-6 mb-8">
                                <div class="flex justify-between font-display font-bold text-2xl text-primary">
                                    <span>Total</span>
                                    <span>${formatCurrency(total)}</span>
                                </div>
                             </div>
                             
                             <div class="bg-background p-4 rounded-lg text-xs text-secondary mb-6 border border-border">
                                <p class="font-bold mb-1 text-primary">Demo Mode</p>
                                <p>No payment required. Click below to simulate an order.</p>
                             </div>
                            
                            <button type="submit" class="btn-primary w-full text-base font-bold">
                                Place Order
                            </button>
                         </div>
                         
                         <p class="text-center text-xs text-subtle">
                            By placing an order, you agree to our Terms of Service.
                         </p>
                    </div>
                </form>
            </div>
        `;
    }

    afterRender() {
        const form = document.getElementById('checkout-form');
        if(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(e.target);
                const orderData = Object.fromEntries(formData.entries());
                
                const subtotal = cart.getTotal();
                const tax = subtotal * 0.18;
                
                // Store Order Info
                const order = {
                    id: 'LUM-' + Math.floor(Math.random() * 100000),
                    date: new Date().toLocaleDateString(),
                    user: orderData,
                    items: cart.get(),
                    totals: {
                        subtotal: subtotal,
                        tax: tax,
                        total: subtotal + tax
                    }
                };
                
                localStorage.setItem('lumina_last_order', JSON.stringify(order));
                cart.clear();
                
                window.location.hash = '/receipt';
            });
        }
    }
}
