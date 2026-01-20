import { cart } from './services/Cart.js';
import { Home } from './views/Home.js';
import { Shop } from './views/Shop.js';
import { Product } from './views/Product.js';
import { CartView } from './views/Cart.js';
import { Checkout } from './views/Checkout.js';
import { Receipt } from './views/Receipt.js';

const routes = {
    '/': Home,
    '/shop': Shop,
    '/product': Product,
    '/cart': CartView,
    '/checkout': Checkout,
    '/receipt': Receipt,
    '/confirm': Receipt
};

cart.subscribe(items => {
    const badge = document.getElementById('cart-badge');
    const count = cart.getCount();
    badge.innerText = count;
    badge.style.opacity = count > 0 ? '1' : '0';
});

async function router() {
    const app = document.getElementById('app');
    
    const hash = window.location.hash.slice(1) || '/';
    const [path, query] = hash.split('?');
    
    const ViewClass = routes[path] || Home;
    
    const params = new URLSearchParams(query);
    
    const view = new ViewClass(params);
    app.innerHTML = await view.render();
    
    if (view.afterRender) view.afterRender();
    
    window.scrollTo(0, 0);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
