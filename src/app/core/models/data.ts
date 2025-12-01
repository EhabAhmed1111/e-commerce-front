export interface ProductsResponse {
  message: string,
  data: Products[]
}

export interface SingleProductResponse {
  message: string,
  data: Products
}
export interface CategoriesResponse {
  message: string,
  data: Category[]
}

// here we need to update this interface
export interface Products {
  id: string,
  productName: string,
  price: number,
  brand: string,
  amount: number,
  description: string,
  categoryName: string,
  medias: Media[]
  vendor: User
}

export interface ProductsForShow {
  id: string,
  productName: string,
  price: number,
  brand: string,
  amount: number,
  description: string,
  categoryName: string,
  medias: Media[],
  thumbnail: string | null
}

// these for product details
export interface ProductsForVendorResponse {
  message: string,
  data: ProductsForVendor[]
}
export interface ProductsForVendor {
  id: string,
  productName: string,
  price: number,
  brand: string,
  amount: number,
  description: string,
  categoryName: string,
  medias: Media[]
}
export interface ProductsForVendorForShow {
  id: string,
  productName: string,
  price: number,
  brand: string,
  amount: number,
  description: string,
  categoryName: string,
  thumbnail: string | null
}

export interface Media {
  fileName: string,
  url: string,
  fileType: string,
  cloudinaryPublicId: string,
  uploadedAt: Date,
  coverImage: boolean
}

export interface Category {
  id: string,
  name: string,
  createdAt: Date,
  updatedAt: Date
}

export interface SignupResponse {
  message?: string,
  data: string
}

export interface SignupRequest {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: string
}

export interface LoginResponse {
  message?: string,
  data: string
}

export interface LoginRequest {
  email: string,
  password: string,
}

export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
}