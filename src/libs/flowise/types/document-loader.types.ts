export interface DocumentLoaderConfig {
  metaData: string;
  omitMetadataKeys: string;
  textSplitter: string;
  txtFile: string;
}

export interface BaseDocumentLoader {
  id: string;
  loaderId: string;
  loaderName: string;
  loaderConfig: DocumentLoaderConfig;
  totalChunks: number;
  totalChars: number;
  status: string;
  source: string;
}

export interface DocumentLoaderFile {
  id: string;
  name: string;
  mimePrefix: string;
  size: number;
  status: string;
  uploaded: string;
}

export interface DocumentLoaderProcessResponse {
  chunks: any[];
  count: number;
  file: DocumentLoaderFile;
  currentPage: number;
  storeName: string;
  description: string | null;
  docId: string;
  characters: number;
}

// {
//   "chunks": [
//     {
//       "id": "8d539e3a-c00e-4e11-9f04-03e437173dfa",
//       "docId": "b15afdcb-f761-41ab-8cf4-c4d14d243aef",
//       "storeId": "fd22ed2f-b99b-45e4-9da4-6b99550303a6",
//       "chunkNo": 1,
//       "pageContent": "this is a sample text created by Ken Adams.",
//       "metadata": "{\"source\":\"blob\",\"blobType\":\"\"}"
//     }
//   ],
//   "count": 1,
//   "file": {
//     "id": "b15afdcb-f761-41ab-8cf4-c4d14d243aef",
//     "loaderId": "textFile",
//     "loaderName": "Text File",
//     "loaderConfig": {
//       "metaData": "{\"key\":\"value\"}",
//       "omitMetadataKeys": "a,b,c,d",
//       "textSplitter": "",
//       "txtFile": "FILE-STORAGE::[\"to-upload.txt\"]"
//     },
//     "totalChunks": 1,
//     "totalChars": 43,
//     "status": "SYNC",
//     "files": [
//       {
//         "id": "5456d9ae-cad8-4893-b41d-213572d42b29",
//         "name": "to-upload.txt",
//         "mimePrefix": "text/plain",
//         "size": 43,
//         "status": "NEW",
//         "uploaded": "2025-05-13T22:58:45.498Z"
//       }
//     ]
//   },
//   "currentPage": 1,
//   "storeName": "note-6823cbbbf0087fe67d379200",
//   "description": null,
//   "docId": "b15afdcb-f761-41ab-8cf4-c4d14d243aef",
//   "characters": 43
// }
