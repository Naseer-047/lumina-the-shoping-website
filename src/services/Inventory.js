class InventoryService {
    constructor() {
        this.categories = [];
        this.products = [];
        this.categoryIndex = {};
        this.productIndex = {};
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        console.time("DB_GEN");
        this.generateCategories();
        this.generateProducts();
        console.timeEnd("DB_GEN");
        this.isInitialized = true;
        console.log(`[Inventory] Online with ${this.categories.length} Categories and ${this.products.length} Products.`);
    }

    generateCategories() {
        this.schema = {
            'Electronics': {
                'Audio': ['Headphones', 'Earbuds', 'Speakers', 'Turntables'],
                'Computers': ['Laptops', 'Desktops', 'Monitors', 'Tablets'],
                'Cameras': ['Mirrorless', 'DSLR', 'Lenses', 'Drones'],
                'Mobile': ['Smartphones', 'Cases', 'Chargers', 'Wearables']
            },
            'Fashion': {
                'Men': ['T-Shirts', 'Jackets', 'Denim', 'Sneakers'],
                'Women': ['Dresses', 'Tops', 'Activewear', 'Heels'],
                'Accessories': ['Watches', 'Bags', 'Eyewear', 'Jewelry']
            },
            'Home': {
                'Furniture': ['Chairs', 'Tables', 'Sofas', 'Desks'],
                'Decor': ['Lighting', 'Planters', 'Art', 'Rugs'],
                'Kitchen': ['Coffee', 'Cookware', 'Tableware', 'Appliances']
            },
            'Lifestyle': {
                'Travel': ['Luggage', 'Backpacks', 'Organizers'],
                'Wellness': ['Skincare', 'Vitamins', 'Aromatherapy'],
                'Work': ['Notebooks', 'Pens', 'Desk Setup']
            }
        };

        let idCounter = 1;

        Object.keys(this.schema).forEach(root => {
            const subs = this.schema[root];
            Object.keys(subs).forEach(sub => {
                const leafs = subs[sub];
                leafs.forEach(leaf => {
                    const name = `${root} ${sub} ${leaf}`;
                    const id = `c-${idCounter++}`;
                    
                    const category = {
                        id,
                        name,
                        path: [root, sub, leaf],
                        displayName: `${root} > ${sub} > ${leaf}`,
                        root: root,
                        sub: sub,
                        leaf: leaf
                    };

                    this.categories.push(category);
                    this.categoryIndex[id] = category;
                });
            });
        });
    }

    generateProducts() {
        const IMAGE_MAP = {
            'Headphones': [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80'
            ],
            'Earbuds': [
                 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
                 'https://images.unsplash.com/photo-1572569028738-411a0977d4da?auto=format&fit=crop&w=800&q=80'
            ],
            'Laptops': [
                'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1531297461136-82lwpg42c?auto=format&fit=crop&w=800&q=80'
            ],
            'Watches': [
                'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
            ],
            'Chairs': [
                'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1503602642458-2321114458ad?auto=format&fit=crop&w=800&q=80'
            ],
            'Sneakers': [
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80'
            ],
            'Dresses': [
                'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80'
            ],
            'Cameras': [
                'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
            ],
             'T-Shirts': [
                 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
                 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
             ]
        };

        const GENERAL_POOL = [
             'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
             'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
             'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
             'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
             'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=800&q=80',
             'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80',
        ];

        const ADJECTIVES = ['Pro', 'Ultra', 'Essential', 'Analog', 'Studio', 'Master', 'Air', 'Prime', 'Elite', 'Core'];

        let idCounter = 1;

        this.categories.forEach(cat => {
            const count = 10 + Math.floor(Math.random() * 8); 
            
            const leaf = cat.path[2]; 
            const specificImages = IMAGE_MAP[leaf] || [];
            
            for(let i=0; i<count; i++) {
                const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
                
                let imgUrl;
                if(specificImages.length > 0) {
                     imgUrl = specificImages[i % specificImages.length];
                } else {
                     imgUrl = GENERAL_POOL[(idCounter + i) % GENERAL_POOL.length];
                }

                const product = {
                    id: `p-${idCounter++}`,
                    name: `${adj} ${leaf} ${i+1}`,
                    categoryId: cat.id,
                    categoryName: cat.displayName,
                    rootCategory: cat.root,
                    price: 1500 + Math.floor(Math.random() * 83500),
                    rating: (3.5 + Math.random() * 1.5).toFixed(1),
                    reviews: Math.floor(Math.random() * 500),
                    image: imgUrl,
                    imageAlt: imgUrl,
                    description: `Experience the ${adj} definition of sound and style. Meticulously engineered for the specific demands of ${cat.path[1]}.`
                };

                this.products.push(product);
                this.productIndex[product.id] = product;
            }
        });
    }

    queryProducts({ page = 1, limit = 12, categoryId, search, rootCategory }) {
        let results = this.products;

        if (categoryId) {
            results = results.filter(p => p.categoryId === categoryId);
        } else if (rootCategory) {
            results = results.filter(p => p.rootCategory === rootCategory);
        }

        if (search) {
            const q = search.toLowerCase();
            results = results.filter(p => p.name.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q));
        }

        const total = results.length;
        const totalPages = Math.ceil(total / limit);
        const offset = (page - 1) * limit;
        const paginated = results.slice(offset, offset + limit);

        return {
            items: paginated,
            meta: {
                total,
                page,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        };
    }

    searchCategories(query) {
        if(!query) return this.categories.slice(0, 20);
        const q = query.toLowerCase();
        return this.categories
            .filter(c => c.name.toLowerCase().includes(q))
            .slice(0, 50);
    }

    getProduct(id) {
        return this.productIndex[id];
    }
    
    getCategory(id) {
        return this.categoryIndex[id];
    }

    getRoots() {
        return [...new Set(this.categories.map(c => c.root))];
    }
}

export const inventory = new InventoryService();
