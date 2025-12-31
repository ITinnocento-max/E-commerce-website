
import { Product, Category } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimalist Linen Shirt',
    description: 'A breathable linen shirt perfect for summer evenings. Tailored fit with sustainable fabric.',
    price: 89,
    category: Category.MEN,
    images: ['https://picsum.photos/seed/linen/600/800'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Navy', 'Sand'],
    stock: 45,
    rating: 4.8,
    featured: true
  },
  {
    id: '2',
    name: 'Silk Evening Gown',
    description: 'Elegant floor-length silk gown with a subtle sheen. Perfect for gala events.',
    price: 299,
    category: Category.WOMEN,
    images: ['https://picsum.photos/seed/gown/600/800'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Emerald', 'Midnight Black', 'Ruby'],
    stock: 12,
    rating: 4.9,
    featured: true
  },
  {
    id: '3',
    name: 'Tech-Utility Parka',
    description: 'Water-resistant parka with multiple pockets and thermal lining.',
    price: 159,
    category: Category.NEW_ARRIVALS,
    images: ['https://picsum.photos/seed/parka/600/800'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Olive', 'Black'],
    stock: 30,
    rating: 4.5
  },
  {
    id: '4',
    name: 'Classic Leather Boots',
    description: 'Handcrafted leather boots with durable soles and timeless design.',
    price: 210,
    category: Category.BEST_SELLERS,
    images: ['https://picsum.photos/seed/boots/600/800'],
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Cognac', 'Espresso'],
    stock: 22,
    rating: 4.7
  },
  {
    id: '5',
    name: 'Cashmere Oversized Sweater',
    description: 'Ultra-soft cashmere sweater for maximum comfort and style.',
    price: 180,
    category: Category.WOMEN,
    images: ['https://picsum.photos/seed/sweater/600/800'],
    sizes: ['S', 'M', 'L'],
    colors: ['Cream', 'Charcoal', 'Blush'],
    stock: 15,
    rating: 4.9,
    featured: true
  },
  {
    id: '6',
    name: 'Cotton Chino Trousers',
    description: 'Versatile chinos that transition perfectly from office to dinner.',
    price: 75,
    category: Category.MEN,
    images: ['https://picsum.photos/seed/chinos/600/800'],
    sizes: ['30', '32', '34', '36'],
    colors: ['Beige', 'Grey', 'Navy'],
    stock: 50,
    rating: 4.6
  }
];
