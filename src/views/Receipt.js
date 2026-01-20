import { formatCurrency } from '../utils/formatting.js';

export class Receipt {
    async render() {
        const order = JSON.parse(localStorage.getItem('lumina_last_order'));
        
        if (!order) {
            return `<div class="p-20 text-center font-display text-secondary">No recent order found.</div>`;
        }

        return `
            <div class="container mx-auto px-6 py-12 max-w-3xl">
                <div class="bg-surface border border-border shadow-xl rounded-2xl overflow-hidden print:shadow-none print:border-none">
                    <!-- Invoice Header -->
                    <div class="bg-background p-10 border-b border-border flex justify-between items-start">
                        <div>
                            <h2 class="text-3xl font-display font-bold tracking-tight mb-2 text-primary">LUMINA.</h2>
                            <p class="text-xs text-subtle uppercase tracking-widest font-bold">Premium Essentials</p>
                        </div>
                        <div class="text-right">
                            <h1 class="text-xl font-mono text-secondary mb-2">RECEIPT</h1>
                            <p class="font-mono font-bold text-primary">#${order.id}</p>
                            <p class="text-sm text-secondary">${order.date}</p>
                        </div>
                    </div>

                    <!-- Bill To -->
                    <div class="p-10 grid md:grid-cols-2 gap-10">
                        <div>
                            <h3 class="text-xs text-subtle uppercase font-bold mb-4 tracking-widest">Billed To</h3>
                            <p class="font-bold text-lg text-primary font-display">${order.user.firstName} ${order.user.lastName}</p>
                            <p class="text-secondary">${order.user.address}</p>
                            <p class="text-secondary">${order.user.city}, ${order.user.state} ${order.user.zip}</p>
                            <p class="text-secondary mt-2">${order.user.email}</p>
                        </div>
                        <div class="text-sm text-secondary bg-background p-6 rounded-xl border border-border">
                            <p class="mb-4"><span class="font-bold text-primary">Note:</span> This is a demo receipt generated for portfolio demonstration purposes.</p>
                            <p>No actual payment was processed.</p>
                        </div>
                    </div>

                    <!-- Items Table -->
                    <div class="px-10">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="text-xs text-subtle uppercase border-b border-border font-bold tracking-wider">
                                    <th class="py-4 font-bold">Item</th>
                                    <th class="py-4 font-bold text-center">Qty</th>
                                    <th class="py-4 font-bold text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm text-secondary">
                                ${order.items.map(item => `
                                    <tr class="border-b border-border last:border-0">
                                        <td class="py-4">
                                            <p class="font-bold text-primary font-display text-base">${item.name}</p>
                                            <p class="text-xs text-subtle">${item.categoryName || 'Product'}</p>
                                        </td>
                                        <td class="py-4 text-center">${item.qty}</td>
                                        <td class="py-4 text-right font-medium text-primary">${formatCurrency(item.price * item.qty)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- Totals -->
                    <div class="p-10 flex justify-end">
                        <div class="w-72 space-y-3 text-sm">
                            <div class="flex justify-between text-secondary">
                                <span>Subtotal</span>
                                <span class="text-primary font-medium">${formatCurrency(order.totals.subtotal)}</span>
                            </div>
                            <div class="flex justify-between text-secondary">
                                <span>Tax (18%)</span>
                                <span class="text-primary font-medium">${formatCurrency(order.totals.tax)}</span>
                            </div>
                            <div class="flex justify-between font-bold text-xl pt-4 border-t border-border font-display text-primary">
                                <span>Total</span>
                                <span>${formatCurrency(order.totals.total)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="bg-primary text-background text-center py-4 text-xs tracking-widest uppercase">
                        Thank you for shopping with Lumina.
                    </div>
                </div>
                
                <div class="text-center mt-8 space-x-4">
                    <button onclick="window.print()" class="btn-secondary inline-block">Print Receipt</button>
                    <a href="#/" class="btn-primary inline-flex">Back Home</a>
                </div>
            </div>
        `;
    }
}
