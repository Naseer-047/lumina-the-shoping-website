import { inventory } from '../services/Inventory.js';
import * as Anim from '../utils/animations.js';
import { formatCurrency } from '../utils/formatting.js';

export class Home {
    constructor() {
        inventory.init();
    }

    async render() {
        // High quality curation queries
        const { items: trending } = inventory.queryProducts({ limit: 3, rootCategory: 'Electronics' });
        const { items: design } = inventory.queryProducts({ limit: 3, rootCategory: 'Home' });
        const { items: audio } = inventory.queryProducts({ limit: 2, search: 'Headphones' });
        const { items: bestsellers } = inventory.queryProducts({ limit: 4, rootCategory: 'Fashion' });

        return `
             <!-- 1. Hero Section -->
            <section class="min-h-[95vh] flex flex-col justify-center items-center relative overflow-hidden px-6 pt-20">
                <div class="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
                         class="w-full h-full object-cover transition-transform duration-[30s] hover:scale-105 opacity-80" alt="Background">
                    <div class="absolute inset-0 bg-background/90 dark:bg-background/95 backdrop-blur-sm"></div>
                </div>

                <div class="container mx-auto max-w-5xl relative z-10 text-center">
                    <div class="hero-animate space-y-8 flex flex-col items-center">
                        <div class="inline-block border border-primary/20 rounded-full px-4 py-1 mb-4">
                            <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Est. 2026</span>
                        </div>
                        <h1 class="text-6xl md:text-8xl lg:text-[9rem] font-medium font-display tracking-tighter leading-[0.85] text-primary uppercase">
                            Timeless <br>
                            <span class="text-secondary/60">Essentials</span>
                        </h1>
                        <p class="text-lg md:text-xl text-primary/70 font-light max-w-xl leading-relaxed mx-auto">
                            Curated artifacts for the modern connoisseur. <br class="hidden md:block"> Engineered for performance, designed for life.
                        </p>
                        <div class="pt-10 flex flex-col md:flex-row items-center gap-6">
                            <a href="#/shop" class="bg-primary text-background text-xs font-bold uppercase tracking-[0.2em] py-5 px-10 hover:bg-accent transition-colors duration-300 min-w-[200px]">
                                Shop Collection
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 2. Marquee Section -->
            <div class="border-y border-border py-6 overflow-hidden bg-background">
                <div class="whitespace-nowrap animate-marquee flex gap-12 text-primary/40 font-bold tracking-widest text-sm uppercase">
                    <span>Worldwide Shipping</span> • <span>Premium Quality</span> • <span>Lifetime Warranty</span> • <span>Secure Checkout</span> • 
                    <span>Worldwide Shipping</span> • <span>Premium Quality</span> • <span>Lifetime Warranty</span> • <span>Secure Checkout</span> •
                    <span>Worldwide Shipping</span> • <span>Premium Quality</span> • <span>Lifetime Warranty</span> • <span>Secure Checkout</span>
                </div>
            </div>

            <!-- 3. Trending Electronics (Grid) -->
            <section class="py-32 container mx-auto px-6 md:px-12 max-w-7xl">
                <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                    <div>
                        <span class="text-xs font-bold tracking-widest text-accent uppercase mb-2 block">New Arrivals</span>
                        <h2 class="text-4xl md:text-5xl font-display font-medium tracking-tight text-primary">System Hardware</h2>
                    </div>
                    <a href="#/shop?root=Electronics" class="text-sm font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors">View All</a>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16" id="trending-grid">
                    ${trending.map(p => this.productCard(p)).join('')}
                </div>
            </section>

            <!-- 4. Feature Focus: Audio (Split Layout) -->
            <section class="bg-surface py-24">
                <div class="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div class="flex flex-col lg:flex-row items-center gap-16">
                        <div class="w-full lg:w-1/2 relative">
                            <div class="aspect-[4/5] overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80" 
                                     class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Audio">
                            </div>
                             <div class="absolute -bottom-6 -right-6 bg-background p-8 max-w-xs shadow-xl hidden md:block">
                                <p class="font-display text-2xl leading-none mb-2">Sonic <br>Perfection</p>
                                <p class="text-sm text-secondary">Engineered for the audiophile.</p>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2 space-y-12">
                            <div class="max-w-md">
                                <h2 class="text-5xl md:text-6xl font-display font-medium tracking-tighter mb-6 text-primary">Immersive <br>Frequencies</h2>
                                <p class="text-lg text-secondary font-light leading-relaxed">
                                    Discover our new range of high-fidelity audio equipment. Calibrated for clarity, designed for comfort. Experience sound as the artist intended.
                                </p>
                                <a href="#/shop?search=Headphones" class="inline-block mt-8 bg-primary text-background text-xs font-bold uppercase tracking-[0.2em] py-4 px-8 hover:bg-accent transition-colors">
                                    Explore Audio
                                </a>
                            </div>
                            <div class="grid grid-cols-2 gap-6">
                                ${audio.map(p => `
                                    <div class="group cursor-pointer">
                                        <div class="aspect-square bg-white mb-3 overflow-hidden">
                                            <img src="${p.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                                        </div>
                                        <h4 class="font-medium text-sm truncate">${p.name}</h4>
                                        <p class="text-xs text-secondary mt-1">${formatCurrency(p.price)}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             <!-- 5. Editorial Banner -->
            <section class="py-12 px-2 md:px-6">
                <div class="relative overflow-hidden h-[70vh] w-full">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80" 
                         class="absolute inset-0 w-full h-full object-cover grayscale opacity-90 transition-transform duration-[40s] hover:scale-105" alt="Workspace">
                    <div class="absolute inset-0 bg-black/30"></div>
                    <div class="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6">
                        <span class="text-xs font-bold tracking-[0.3em] uppercase mb-4 opacity-80">The Edit</span>
                        <h2 class="text-6xl md:text-8xl font-display font-medium tracking-tighter mb-6">Workspace <br>Ecosystems</h2>
                        <a href="#/shop?root=Home" class="border border-white/30 text-white text-xs font-bold uppercase tracking-[0.2em] py-4 px-10 hover:bg-white hover:text-black transition-all duration-300">View Collection</a>
                    </div>
                </div>
            </section>

            <!-- 6. Best Sellers Grid (4 Cols) -->
            <section class="py-32 container mx-auto px-6 md:px-12 max-w-8xl">
                 <div class="text-center mb-20">
                    <span class="text-xs font-bold tracking-widest text-accent uppercase mb-3 block">Most Coveted</span>
                    <h2 class="text-4xl md:text-5xl font-display font-medium tracking-tight text-primary">Seasonal Favorites</h2>
                </div>
                 <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    ${bestsellers.map(p => this.productCard(p)).join('')}
                </div>
            </section>

            <!-- 7. Value Propositions ("The Standard") -->
            <section class="py-24 bg-surface border-y border-border">
                <div class="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div class="space-y-4 px-4">
                            <div class="text-4xl mb-4 text-primary">✦</div>
                            <h3 class="text-lg font-bold uppercase tracking-widest">Premium Materials</h3>
                            <p class="text-secondary font-light leading-relaxed">Sourced from the finest suppliers. We ensure every artifact meets our rigorous standards.</p>
                        </div>
                         <div class="space-y-4 px-4 border-x border-border/50">
                            <div class="text-4xl mb-4 text-primary">⚡</div>
                            <h3 class="text-lg font-bold uppercase tracking-widest">Next-Day Delivery</h3>
                            <p class="text-secondary font-light leading-relaxed">Time is the ultimate luxury. We ship globally with expedited options available.</p>
                        </div>
                         <div class="space-y-4 px-4">
                            <div class="text-4xl mb-4 text-primary">🛡</div>
                            <h3 class="text-lg font-bold uppercase tracking-widest">Lifetime Warranty</h3>
                            <p class="text-secondary font-light leading-relaxed">We stand by our curation. If it breaks, we replace it. No questions asked.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 8. Design Objects (Grid) -->
             <section class="py-32 container mx-auto px-6 md:px-12 max-w-7xl">
                 <div class="flex justify-between items-baseline mb-20">
                    <h2 class="text-3xl font-display font-medium tracking-tight">Interior Objects</h2>
                    <a href="#/shop?root=Home" class="text-sm font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-accent hover:border-accent transition-colors">See All</a>
                </div>
                 <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16" id="design-grid">
                    ${design.map(p => this.productCard(p)).join('')}
                </div>
            </section>

            <!-- 9. Newsletter -->
            <section class="py-32 px-6 md:px-12 bg-primary text-background text-center relative overflow-hidden">
                <div class="relative z-10 max-w-2xl mx-auto space-y-8">
                    <h2 class="text-5xl md:text-7xl font-display font-medium tracking-tighter">Join the Inner Circle</h2>
                    <p class="text-lg opacity-70 font-light">Receive early access to drops, exclusive editorial content, and member-only pricing.</p>
                    <form class="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                        <input type="email" placeholder="ENTER YOUR EMAIL" class="flex-1 bg-transparent border-b border-white/30 py-4 px-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors text-sm tracking-widest uppercase text-center md:text-left">
                        <button type="button" class="bg-white text-black text-xs font-bold uppercase tracking-[0.2em] py-4 px-8 hover:bg-accent hover:text-white transition-colors">Subscribe</button>
                    </form>
                </div>
                <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style="background-image: url('https://grainy-gradients.vercel.app/noise.svg');"></div>
            </section>
        `;
    }

    afterRender() {
        Anim.revealHero('.hero-animate');
        Anim.staggerGrid('#trending-grid > div', '#trending-grid');
        Anim.staggerGrid('#design-grid > div', '#design-grid');
        
        // Add simple marquee animation style if not present
        if (!document.getElementById('marquee-style')) {
            const style = document.createElement('style');
            style.id = 'marquee-style';
            style.textContent = `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `;
            document.head.appendChild(style);
        }
    }

    productCard(p) {
        return `
            <div class="group cursor-pointer">
                <a href="#/product?id=${p.id}" class="card-interactive block relative overflow-hidden aspect-[4/5] mb-6 border-none">
                    <img src="${p.imageAlt}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out">
                </a>
                <div class="space-y-1 px-1">
                    <h3 class="font-medium text-base tracking-tight leading-tight group-hover:text-secondary transition-colors">${p.name}</h3>
                    <p class="text-sm text-secondary">${p.categoryName.split('>')[2] || 'Item'}</p>
                    <div class="pt-2 font-medium text-sm text-primary">${formatCurrency(p.price)}</div>
                </div>
            </div>
        `;
    }
}
