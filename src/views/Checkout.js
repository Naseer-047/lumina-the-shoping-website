import { cart } from '../services/Cart.js';

export class Checkout {
    async render() {
        if (cart.getCount() === 0) {
            window.location.hash = '/cart';
            return '';
        }

        return `
            <div class="container mx-auto px-6 py-12 max-w-4xl">
                <div class="mb-12 text-center">
                    <h1 class="text-3xl font-serif font-bold">Secure Checkout</h1>
                    <p class="text-gray-500">Complete your details to place the order.</p>
                </div>

                <form id="checkout-form" class="grid md:grid-cols-2 gap-12">
                    <!-- Shipping Info -->
                    <div class="space-y-6">
                        <h3 class="font-bold text-lg border-b border-gray-100 pb-2">Shipping Details</h3>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <input type="text" name="firstName" required placeholder="First Name" class="bg-gray-50 text-sm p-4 rounded outline-none focus:ring-1 focus:ring-black">
                            <input type="text" name="lastName" required placeholder="Last Name" class="bg-gray-50 text-sm p-4 rounded outline-none focus:ring-1 focus:ring-black">
                        </div>
                        
                        <input type="email" name="email" required placeholder="Email Address" class="w-full bg-gray-50 text-sm p-4 rounded outline-none focus:ring-1 focus:ring-black">
                        <input type="tel" name="phone" required placeholder="Phone Number" class="w-full bg-gray-50 text-sm p-4 rounded outline-none focus:ring-1 focus:ring-black">
                        
                        <input type="text" name="address" required placeholder="Street Address" class="w-full bg-gray-50 text-sm p-4 rounded outline-none focus:ring-1 focus:ring-black">
                        
                        <div class="grid grid-cols-3 gap-4">
                            <input type="text" name="city" required placeholder="City" class="col-span-1 bg-gray-50 text-sm p-4 rounded outline-none focus:ring-1 focus:ring-black">
                            <input type="text" name="zip" required placeholder="ZIP" class="col-span-1 bg-gray-50 text-sm p-4 rounded outline-none focus:ring-1 focus:ring-black">
                            <input type="text" name="state" required placeholder="State" class="col-span-1 bg-gray-50 text-sm p-4 rounded outline-none focus:ring-1 focus:ring-black">
                        </div>
                    </div>

                    <!-- Payment (Dummy) & Summary -->
                    <div class="space-y-6">
                         <h3 class="font-bold text-lg border-b border-gray-100 pb-2">Payment</h3>
                         
                         <div class="bg-gray-50 p-6 rounded text-sm text-gray-500 mb-6">
                            <p class="mb-2">ⓘ This is a demo. No payment is required.</p>
                            <p>Select "Place Order" to generate your receipt.</p>
                         </div>

                         <div class="border-t border-gray-100 pt-6">
                            <div class="flex justify-between font-bold text-xl mb-6">
                                <span>Total</span>
                                <span>$${(cart.getTotal() * 1.08).toFixed(2)}</span>
                            </div>
                            
                            <button type="submit" class="w-full bg-black text-white py-4 rounded font-bold hover:bg-gray-800 transition">
                                Place Order
                            </button>
                         </div>
                    </div>
                </form>
            </div>
        `;
    }

    afterRender() {
        document.getElementById('checkout-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const orderData = Object.fromEntries(formData.entries());
            
            // Store Order Info
            const order = {
                id: 'LUM-' + Math.floor(Math.random() * 100000),
                date: new Date().toLocaleDateString(),
                user: orderData,
                items: cart.get(),
                totals: {
                    subtotal: cart.getTotal(),
                    tax: cart.getTotal() * 0.08,
                    total: cart.getTotal() * 1.08
                }
            };
            
            localStorage.setItem('lumina_last_order', JSON.stringify(order));
            cart.clear();
            
            window.location.hash = '/receipt';
        });
    }
}
