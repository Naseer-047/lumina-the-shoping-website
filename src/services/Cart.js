/**
 * CartService.js
 * Manages cart state using LocalStorage.
 */

class CartService {
  constructor() {
    this.key = 'lumina_cart';
    this.items = JSON.parse(localStorage.getItem(this.key)) || [];
    this.listeners = [];
  }

  get() {
    return this.items;
  }

  add(product, qty = 1) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ ...product, qty });
    }
    this.save();
  }

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }

  updateQty(id, qty) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.qty = qty;
      if (item.qty <= 0) this.remove(id);
      else this.save();
    }
  }

  clear() {
    this.items = [];
    this.save();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.items));
    this.notify();
  }

  subscribe(cb) {
    this.listeners.push(cb);
    cb(this.items); // Initial call
  }

  notify() {
    this.listeners.forEach(cb => cb(this.items));
    // Also dispatch custom event for loose coupling
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }
}

export const cart = new CartService();
