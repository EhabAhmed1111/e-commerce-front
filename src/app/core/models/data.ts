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
  medias: Media[],
  vendor: User,
  avgRate: number | null
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
  thumbnail: string | null,
  avgRate: number | null
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
  medias: Media[],
  avgRate: number | null

}
export interface ProductsForVendorForShow {
  id: string,
  productName: string,
  price: number,
  brand: string,
  amount: number,
  description: string,
  categoryName: string,
  thumbnail: string | null,
  avgRate: number | null
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
  imageUrl: string,
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

/* reviews */
export interface ReviewResponse {
  message: string,
  data: Review[]
}

export interface ReviewResponseForAddReview {
  message: string,
  data: Review
}

export interface Review {
  id: string,
  userDto: User,
  rating: number,
  content: string,
  createdAt: Date
} 

export interface ReviewRequest {
  rating: number,
  content: string
}

// this interface is for decoded token
export interface DecodedToken {
  // email
  sub: string;
  // role
  role: string;
  // issue time
  iat: number;
  // expire time
  exp: number;
  [key: string]: any;
}

// cart
export interface CartResponse {
  message: string,
  data: Cart
}

export interface Cart {
  id: string,
  isActive: boolean,
  totalPrice: number,
  updatedAt: Date,
  createdAt: Date,
  cartItemsDto: CartItemDto[],
}

export interface CartItemDto {
  id: string,
  unitePrice: number,
  totalPrice: number,
  updatedAt: Date,
  createdAt: Date,
  quantity: number,
  productResponse: ProductsForCart
}



export interface ProductsForCart {
  id: string,
  productName: string,
  price: number,
  brand: string,
  amount: number,
  description: string,
  categoryName: string,
  vendor: User,
  medias: Media[],
  avgRate: number | null,
  thumbnail: string | null
}


/** wishlist */

export interface WishlistResponse {
  message: string,
  data: Wishlist
}

export interface WishlistResponseForCheck {
  message: string,
  data: boolean
}

export interface Wishlist {
  count: number,
  productResponseSet: ProductsForCart[]
}


export interface OrderResponse {
  message: string,
  data: OrderResponseData
}

export interface OrderResponseData{
id: string,
totalPrice: number,
createdAt: Date,
updatedAt: Date,
user: User,
orderItems: CartItemDto[],
clientSecret: string,
paymentId: string
}

export interface Payment {
  message: string,
  data: PaymentData
}

export interface PaymentData {
  id: string,
  amount: number,
  currency: string,
  status: string,
}


export interface AddProductRequest {
  productName: string,
  price: number,
  brand: string,
  amount: number,
  description: string,
  categoryName: string
}
