export class Receipt {
    async render() {
        const order = JSON.parse(localStorage.getItem('lumina_last_order'));
        
        if (!order) {
            return `<div class="p-20 text-center">No recent order found.</div>`;
        }

        return `
            <div class="container mx-auto px-6 py-12 max-w-3xl">
                <div class="bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden print:shadow-none print:border-none">
                    <!-- Invoice Header -->
                    <div class="bg-gray-50 p-10 border-b border-gray-100 flex justify-between items-start">
                        <div>
                            <h2 class="text-3xl font-bold tracking-tight mb-2">LUMINA.</h2>
                            <p class="text-xs text-gray-400 uppercase tracking-widest">Premium Essentials</p>
                        </div>
                        <div class="text-right">
                            <h1 class="text-xl font-mono text-gray-500 mb-2">RECEIPT</h1>
                            <p class="font-mono font-bold">#${order.id}</p>
                            <p class="text-sm text-gray-500">${order.date}</p>
                        </div>
                    </div>

                    <!-- Bill To -->
                    <div class="p-10 grid md:grid-cols-2 gap-10">
                        <div>
                            <h3 class="text-xs text-gray-400 uppercase font-bold mb-4">Billed To</h3>
                            <p class="font-bold text-lg">${order.user.firstName} ${order.user.lastName}</p>
                            <p class="text-gray-500">${order.user.address}</p>
                            <p class="text-gray-500">${order.user.city}, ${order.user.state} ${order.user.zip}</p>
                            <p class="text-gray-500 mt-2">${order.user.email}</p>
                        </div>
                        <div class="text-sm text-gray-500 bg-gray-50 p-6 rounded">
                            <p class="mb-4"><span class="font-bold text-black">Note:</span> This is a demo receipt generated for portfolio demonstration purposes.</p>
                            <p>No actual payment was processed.</p>
                        </div>
                    </div>

                    <!-- Items Table -->
                    <div class="px-10">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="text-xs text-gray-400 uppercase border-b border-gray-100">
                                    <th class="py-4 font-bold">Item</th>
                                    <th class="py-4 font-bold text-center">Qty</th>
                                    <th class="py-4 font-bold text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody class="text-sm">
                                ${order.items.map(item => `
                                    <tr class="border-b border-gray-50">
                                        <td class="py-4">
                                            <p class="font-bold">${item.name}</p>
                                            <p class="text-xs text-gray-400">${item.category}</p>
                                        </td>
                                        <td class="py-4 text-center text-gray-500">${item.qty}</td>
                                        <td class="py-4 text-right font-medium">$${(item.price * item.qty).toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- Totals -->
                    <div class="p-10 flex justify-end">
                        <div class="w-64 space-y-3 text-sm">
                            <div class="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>$${order.totals.subtotal.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between text-gray-500">
                                <span>Tax (8%)</span>
                                <span>$${order.totals.tax.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between font-bold text-xl pt-4 border-t border-gray-100">
                                <span>Total</span>
                                <span>$${order.totals.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="bg-black text-white text-center py-4 text-xs">
                        Thank you for shopping with Lumina.
                    </div>
                </div>
                
                <div class="text-center mt-8 space-x-4">
                    <button onclick="window.print()" class="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">Print Receipt</button>
                    <a href="#/" class="px-6 py-2 bg-black text-white rounded hover:bg-gray-800">Back Home</a>
                </div>
            </div>
        `;
    }
}
