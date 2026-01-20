import { inventory } from '../services/Inventory.js';
import { cart } from '../services/Cart.js';
import * as Anim from '../utils/animations.js';
import { formatCurrency } from '../utils/formatting.js';

export class Product {
    constructor(params) {
        inventory.init();
        this.productId = params.get('id');
        this.product = inventory.getProduct(this.productId);
    }

    async render() {
        if (!this.product) return `<div class="min-h-screen flex items-center justify-center text-secondary">Product Not Found.</div>`;

        const p = this.product;
        const cat = inventory.getCategory(p.categoryId);

        return `
            <div class="container mx-auto px-6 md:px-12 py-12 max-w-7xl animate-fade-in">
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
                    
                    <!-- Gallery -->
                    <div class="lg:sticky lg:top-32 space-y-4">
                        <div class="bg-surface rounded aspect-square overflow-hidden cursor-zoom-in relative group">
                            <img src="${p.imageAlt}" id="product-img" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110">
                        </div>
                    </div>

                    <!-- Details -->
                    <div class="flex flex-col pt-4">
                        <!-- Breadcrumb -->
                        <nav class="flex gap-2 text-xs text-subtle mb-6 uppercase tracking-widest font-bold">
                             <a href="#/shop?root=${cat.root}" class="hover:text-primary transition-colors">${cat.root}</a>
                             <span>/</span>
                             <span class="text-primary">${cat.path[2]}</span>
                        </nav>
                        
                        <h1 class="text-4xl md:text-5xl font-display font-medium tracking-tight mb-6 text-primary leading-[1.1]">${p.name}</h1>
                        
                        <div class="text-3xl text-primary font-light mb-10 tracking-tight">${formatCurrency(p.price)}</div>

                        <!-- Add to Cart (Clean) -->
                         <div class="flex flex-col gap-4 mb-12 max-w-sm">
                                <button id="add-to-cart" class="btn-primary w-full">
                                    Add to Cart
                                </button>
                                <p class="text-xs text-center text-subtle">Free shipping on global orders over $1,500.</p>
                        </div>
                        
                        <!-- Description -->
                        <div class="space-y-8 max-w-md">
                            <div>
                                <h3 class="font-bold text-sm text-primary mb-2">Overview</h3>
                                <p class="text-secondary text-base leading-relaxed font-light">${p.description} Constructed with precision milling and designed for durability in professional environments.</p>
                            </div>

                            <div class="grid grid-cols-2 gap-4 pt-8 border-t border-border">
                                <div>
                                    <h4 class="text-xs font-bold text-subtle uppercase tracking-widest mb-1">Material</h4>
                                    <p class="text-sm text-secondary">Aerospace Grade</p>
                                </div>
                                <div>
                                    <h4 class="text-xs font-bold text-subtle uppercase tracking-widest mb-1">Warranty</h4>
                                    <p class="text-sm text-secondary">2 Years Extended</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {
        Anim.revealImage('#product-img');
        const btn = document.getElementById('add-to-cart');
        if (btn) {
            btn.onclick = () => {
                cart.add(this.product);
                Anim.flyToCart(document.getElementById('product-img'));
                
                const originalText = btn.innerText;
                btn.innerText = "Processing";
                setTimeout(() => {
                    btn.innerText = "Added";
                    btn.style.backgroundColor = '#10B981'; // Emerald
                }, 400);

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                }, 2000);
            };
        }
    }
}
