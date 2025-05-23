import { AxiosResponse } from 'axios';
import { flowiseApi } from './axios';
import {
  BaseDocumentLoader,
  DocumentLoaderProcessResponse,
} from './types/document-loader.types';

export const create = async (
  documentStoreId: string,
  txtFile: string,
): Promise<AxiosResponse<BaseDocumentLoader>> => {
  return flowiseApi.post('/document-store/loader/save', {
    loaderConfig: {
      metaData: JSON.stringify({ key: 'value' }),
      omitMetadataKeys: 'a,b,c,d',
      textSplitter: '',
      txtFile,
    },
    loaderId: 'textFile',
    loaderName: 'Text File',
    storeId: documentStoreId,
  });
};

export const process = async (
  documentLoaderId: string,
  body: any,
): Promise<AxiosResponse<DocumentLoaderProcessResponse>> => {
  return flowiseApi.post(
    `/document-store/loader/process/${documentLoaderId}`,
    body,
  );
};

export const documentLoaders = {
  create,
  process,
};

// http://localhost:3000/api/v1/document-store/loader/process/6fe379c0-2463-4ef6-ab42-ce9381a8066a
