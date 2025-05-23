import { flowiseApi } from './axios';
import {
  CreateDocumentStoreBody,
  CreateDocumentStoreResponse,
  UpdateDocumentStoreBody,
  GetAllDocumentStoresResponse,
  DeleteDocumentStoreResponse,
  GetDocumentStoreResponse,
  UpdateDocumentStoreResponse,
  UpsertAllResponse,
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

export const upsertAll = async (
  documentStoreId: string,
): Promise<AxiosResponse<UpsertAllResponse>> => {
  return flowiseApi.post('/document-store/vectorstore/insert', {
    storeId: documentStoreId,
    // TODO: credentials should come from .env (FLOWISE_EMBEDDING_ID, FLOWISE_VECTORE_STORE_CONFIG_ID)
    embeddingConfig: {
      stripNewLines: true,
      batchSize: '',
      timeout: '',
      basepath: '',
      baseOptions: '',
      modelName: '',
      dimensions: '',
      credential: '96ed64ae-e3cf-4bbe-995e-f3a81577c325',
    },
    embeddingName: 'openAIEmbeddingsCustom',
    vectorStoreConfig: {
      document: '',
      embeddings: '',
      recordManager: '',
      pineconeIndex: 'flowise-dev',
      pineconeNamespace: 'test',
      fileUpload: false,
      pineconeTextKey: '',
      pineconeMetadataFilter: '',
      topK: '',
      searchType: 'similarity',
      fetchK: '',
      lambda: '',
      credential: 'bfd38fe2-3338-47c9-aa2b-fc45c14b0787',
    },
    vectorStoreName: 'pinecone',
    recordManagerConfig: null,
    recordManagerName: '',
  });
};

export const documentStores = {
  create,
  get,
  getAll,
  update,
  delete: remove,
  upsertAll,
};
