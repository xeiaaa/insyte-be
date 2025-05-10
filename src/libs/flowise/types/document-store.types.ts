// ==============================
// Enums
// ==============================

export enum DocumentStoreStatus {
  EMPTY = 'EMPTY',
  SYNC = 'SYNC',
  SYNCING = 'SYNCING',
  STALE = 'STALE',
  NEW = 'NEW',
  UPSERTING = 'UPSERTING',
  UPSERTED = 'UPSERTED',
}

// ==============================
// Generic Named Wrapper
// ==============================

export interface NamedConfig<T> {
  name: string;
  config: T;
}

// ==============================
// Config Interfaces
// ==============================

export interface VectorStoreConfig {
  document?: string;
  embeddings?: string;
  recordManager?: string;
  pineconeIndex: string;
  pineconeNamespace: string;
  fileUpload?: boolean | string;
  pineconeTextKey?: string;
  pineconeMetadataFilter?: string;
  topK?: string;
  searchType?: string;
  fetchK?: string;
  lambda?: string;
  credential: string;
}

export interface EmbeddingConfig {
  modelName?: string;
  stripNewLines?: boolean | string;
  batchSize?: string;
  timeout?: string;
  basepath?: string;
  dimensions?: string;
  credential: string;
}

export interface RecordManagerConfig {
  id?: string;
}

// ==============================
// Document Store Models
// ==============================

export interface BaseDocumentStore {
  id: string;
  name: string;
  loaders: string;
  whereUsed: string;
  status: DocumentStoreStatus;
  description: string | null;
  vectorStoreConfig: string | null;
  embeddingConfig: string | null;
  recordManagerConfig: string | null;
  createdDate: string;
  updatedDate: string;
}

export type CreateDocumentStoreResponse = BaseDocumentStore;

export interface GetDocumentStoreResponse extends BaseDocumentStore {
  totalChars: number;
  totalChunks: number;
}

export type GetAllDocumentStoresResponse = GetDocumentStoreResponse[];
export type UpdateDocumentStoreResponse = GetDocumentStoreResponse;

export interface DeleteDocumentStoreResponse {
  deleted: number;
}

// ==============================
// Create/Update DTOs with Clean Overrides
// ==============================

type OverrideConfigFields =
  | 'vectorStoreConfig'
  | 'embeddingConfig'
  | 'recordManagerConfig';

export type CreateDocumentStoreBody = Partial<
  Omit<BaseDocumentStore, OverrideConfigFields>
> & {
  vectorStoreConfig?: string;
  embeddingConfig?: string;
  recordManagerConfig?: string;
};

export type UpdateDocumentStoreBody = Partial<
  Omit<BaseDocumentStore, OverrideConfigFields>
> & {
  vectorStoreConfig?: string;
  embeddingConfig?: string;
  recordManagerConfig?: string;
};

// ==============================
// Parsed Config Types (Optional)
// ==============================

export type ParsedVectorStoreConfig = NamedConfig<VectorStoreConfig>;
export type ParsedEmbeddingConfig = NamedConfig<EmbeddingConfig>;
export type ParsedRecordManagerConfig = NamedConfig<RecordManagerConfig>;
