// Define the interface for the product
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

// Define the interface for the JSON data
export interface ProductData {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
