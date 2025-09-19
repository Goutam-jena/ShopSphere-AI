import { Seller } from "./sellerTypes";

export interface Category {
    _id?: number;
    name: string;
    categoryId: string;
    parentCategory?: Category;
    level: number;
  }

export interface Product {
    _id?: string;
    title: string;
    description: string;
    mrpPrice: number;
    sellingPrice: number;
    discountPercent?: number;
    quantity?: number;
    color: string;
    images: string[];
    numRatings?: number;
    category?: Category;
    seller?: Seller;
    createdAt?: Date;
    sizes: string[];
  }