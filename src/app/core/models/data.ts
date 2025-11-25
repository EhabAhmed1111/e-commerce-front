export interface ProductsResponse {
  message: string,
  data: Products[]
}
export interface CategoriesResponse {
  message: string,
  data: Category[]
}

export interface Products {
  id: string,
  productName: string,
  price: number,
  brand: string,
  amount: number,
  description: string,
  categoryName: string,
  medias: Media[]
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