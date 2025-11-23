export interface GlobalResponse {
message: string,
data: Products[]
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