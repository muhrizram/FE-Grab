export interface ApiCUDResponseInterface {
  message: string;
  statusCode: number;
  status: string;
  data: CUDResponse;
}

export interface ApiListInterface { 
  message: string
  statusCode: number
  status: string
  totalData?: number
  data?: Array<any>
}

export interface CreateOrderPayload 
{
  pax: Pax
  menu: Menu
  status: string
}

interface Pax {
  id: string;
  fullName: string;
}

export interface Menu {
  id: string;
  name: string;
  image?: string;
  description?: string;
  price: string;
}

export interface CUDResponse {
  id: string;
  menu: Menu;
  pax: Pax;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}


