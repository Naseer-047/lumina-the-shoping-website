import { inventory } from '../services/Inventory.js';
import * as Anim from '../utils/animations.js';
import { formatCurrency } from '../utils/formatting.js';

export class Shop {
    constructor(params) {
        this.page = parseInt(params.get('page')) || 1;
        this.categoryId = params.get('catId');
        this.rootCategory = params.get('root');
        this.search = params.get('q') || '';
        inventory.init();
    }

    async render() {
        const { items, meta } = inventory.queryProducts({
            page: this.page,
            limit: 12, // Keep it tight
            categoryId: this.categoryId,
            rootCategory: this.rootCategory,
            search: this.search
        });

        const activeCategory = this.categoryId ? inventory.getCategory(this.categoryId) : null;
        const title = activeCategory ? activeCategory.path[2] : (this.rootCategory || 'Catalog');
        const subtitle = activeCategory ? activeCategory.displayName.replace(' > ', ' / ') : 'All Products';

        return `
            <div class="container mx-auto px-6 md:px-12 py-12 max-w-7xl animate-fade-in">
                
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    <!-- Professional Sidebar (Left Col) -->
                    <aside class="lg:col-span-3 space-y-12">
                        
                        <!-- Search Context -->
                        <div>
                            <h3 class="font-bold text-xs uppercase tracking-widest text-secondary mb-4">Search</h3>
                            <div class="relative group">
                                <input type="text" id="shop-search" value="${this.search}" placeholder="Keyword..." 
                                    class="w-full bg-transparent border-b border-border py-2 text-sm focus:border-primary outline-none transition-colors placeholder:text-subtle">
                                <span class="absolute right-0 top-2 text-subtle font-mono text-xs">/</span>
                            </div>
                        </div>

                        <!-- Department Tree -->
                        <div>
                            <div class="flex justify-between items-baseline mb-4">
                                <h3 class="font-bold text-xs uppercase tracking-widest text-secondary">Departments</h3>
                                ${this.categoryId || this.rootCategory ? `<a href="#/shop" class="btn-text text-xs">Reset</a>` : ''}
                            </div>
                            <ul class="space-y-2 text-sm">
                                ${inventory.getRoots().map(root => `
                                    <li>
                                        <a href="#/shop?root=${root}" class="block py-1 hover:translate-x-1 transition-transform ${this.rootCategory === root ? 'text-primary font-medium' : 'text-secondary hover:text-primary'}">
                                            ${root}
                                        </a>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <!-- Granular Filter (1000 categories) -->
                        <div>
                            <h3 class="font-bold text-xs uppercase tracking-widest text-secondary mb-4">Sub-Categories</h3>
                            <input type="text" id="cat-filter" placeholder="Filter list..." class="w-full bg-surface border border-border rounded-xl px-4 py-3 text-xs mb-3 focus:border-primary outline-none text-primary transition-colors">
                            <div class="max-h-64 overflow-y-auto space-y-1 custom-scroll opacity-80 hover:opacity-100 transition-opacity" id="cat-list">
                                <!-- Dynamic List -->
                            </div>
                        </div>
                    </aside>

                    <!-- Main Grid (Right Col) -->
                    <main class="lg:col-span-9">
                        <!-- Minimal Header -->
                        <div class="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-border pb-6">
                            <div>
                                <h1 class="text-4xl font-display font-medium tracking-tight mb-2 text-primary">${title}</h1>
                                <p class="text-sm text-secondary">${subtitle} <span class="text-subtle ml-2">• ${meta.total} items</span></p>
                            </div>
                            <div class="flex gap-2 text-sm mt-4 md:mt-0">
                                <button class="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                     ${!meta.hasPrev ? 'disabled' : ''} onclick="window.location.hash='#/shop?page=${meta.page - 1}${this.getParams()}'">←</button>
                                <button class="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                     ${!meta.hasNext ? 'disabled' : ''} onclick="window.location.hash='#/shop?page=${meta.page + 1}${this.getParams()}'">→</button>
                            </div>
                        </div>

                        ${items.length > 0 ? `
                            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12" id="shop-grid">
                                ${items.map(p => this.productCard(p)).join('')}
                            </div>
                        ` : `
                            <div class="py-32 text-center">
                                <p class="text-lg text-secondary">No items found matching your criteria.</p>
                                <a href="#/shop" class="btn-text mt-4 inline-block">Reset Filters</a>
                            </div>
                        `}
                    </main>
                </div>
            </div>
        `;
    }

    getParams() {
        let s = '';
        if(this.categoryId) s += `&catId=${this.categoryId}`;
        if(this.rootCategory) s += `&root=${this.rootCategory}`;
        if(this.search) s += `&q=${this.search}`;
        return s;
    }

    productCard(p) {
        return `
            <div class="group cursor-pointer">
                <a href="#/product?id=${p.id}" class="card-interactive block relative overflow-hidden aspect-[4/5] mb-4">
                    <img src="${p.imageAlt}" loading="lazy" alt="${p.name}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
                </a>
                <div class="px-1">
                    <div class="flex justify-between items-start">
                        <h3 class="font-medium text-sm text-primary group-hover:text-accent transition-colors">${p.name}</h3>
                        <span class="text-sm text-primary font-medium">${formatCurrency(p.price)}</span>
                    </div>
                    <p class="text-xs text-subtle mt-1">${p.categoryName.split('>')[2] || 'General'}</p>
                </div>
            </div>
        `;
    }

    afterRender() {
        Anim.staggerGrid('#shop-grid > div', '#shop-grid');

        // Search Handlers
        const input = document.getElementById('shop-search');
        if(input) {
            input.addEventListener('keypress', (e) => {
                if(e.key === 'Enter') window.location.hash = `#/shop?q=${e.target.value}`;
            });
            input.addEventListener('focus', () => {
                // Focus Animation if needed
            });
        }

        // Sub-Category Filter Logic
        const catList = document.getElementById('cat-list');
        const catFilter = document.getElementById('cat-filter');
        
        const renderCats = (query) => {
            const matches = inventory.searchCategories(query);
            catList.innerHTML = matches.map(c => `
                <a href="#/shop?catId=${c.id}" class="block py-1.5 px-2 rounded text-xs truncate transition-colors ${this.categoryId === c.id ? 'bg-primary text-white' : 'text-secondary hover:bg-gray-50'}">
                    ${c.displayName}
                </a>
            `).join('');
        };
        renderCats('');
        catFilter.addEventListener('input', (e) => renderCats(e.target.value));
    }
}
