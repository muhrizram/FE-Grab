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
  data?: Array<any>
}

export interface CreateorderPayload 
{
  menuId: string
  paxId: string
  status: string
}

interface CUDResponse {
  id?: string;
  menuId: string;
  paxId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}


