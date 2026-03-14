export interface Category {
  name: string;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  image: string;
  isNew: boolean;
  description?: string;
  gallery?: string[];
  colors?: string[];
  sizes?: string[];
  specs?: { [key: string]: string };
}

export interface Testimonial {
  content: string;
  author: string;
  role: string;
}
