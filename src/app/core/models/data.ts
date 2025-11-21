export interface Product {
  id: string,
  productName: string,
  price: number,
  brand: string,
  amount: number,
  description: string,
  categoryName: string,
  medias?: Media[]
}

export interface Media {
fileName: string,
url: string,
fileType: string,
cloudinaryPublicId: string,
uploadedAt: Date
}