import { flowiseApi } from './axios';
import {
  CreateDocumentStoreBody,
  CreateDocumentStoreResponse,
  UpdateDocumentStoreBody,
  GetAllDocumentStoresResponse,
  DeleteDocumentStoreResponse,
  GetDocumentStoreResponse,
  UpdateDocumentStoreResponse,
} from './types/document-store.types';
import { AxiosResponse } from 'axios';

export const create = async (
  body: CreateDocumentStoreBody,
): Promise<AxiosResponse<CreateDocumentStoreResponse>> => {
  return flowiseApi.post('/document-store/store', body);
};

export const get = async (
  documentStoreId: string,
): Promise<AxiosResponse<GetDocumentStoreResponse>> => {
  return flowiseApi.get(`/document-store/store/${documentStoreId}`);
};

export const getAll = async (): Promise<
  AxiosResponse<GetAllDocumentStoresResponse>
> => {
  return flowiseApi.get('/document-store/store');
};

export const update = async (
  documentStoreId: string,
  body: UpdateDocumentStoreBody,
): Promise<AxiosResponse<UpdateDocumentStoreResponse>> => {
  return flowiseApi.put(`/document-store/store/${documentStoreId}`, body);
};

export const remove = async (
  documentStoreId: string,
): Promise<AxiosResponse<DeleteDocumentStoreResponse>> => {
  return flowiseApi.delete(`/document-store/store/${documentStoreId}`);
};

export const documentStores = {
  create,
  get,
  getAll,
  update,
  delete: remove,
};
