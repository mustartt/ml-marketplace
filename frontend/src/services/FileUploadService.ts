import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import ApiRoute from './ApiRoutesService';

export type UploadProgressType = number;

const uploadFile = (
  url: string,
  file: File,
  cancelToken: CancelTokenSource,
  progressCallback: (progress: UploadProgressType) => void): Promise<AxiosResponse<string>> => {

  const formData = new FormData();
  formData.append('file', file, file.name);

  return axios.post<string>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent: ProgressEvent) =>
      progressCallback(progressEvent.loaded / progressEvent.total),
    cancelToken: cancelToken.token,
  });
};

type ProgressCallback = (progress: number, filename: string) => void;

class UploadFileSession {
  private readonly source: CancelTokenSource;
  private readonly request: Promise<AxiosResponse<string>> | undefined;
  private readonly file: File;
  private readonly progressCallback: ProgressCallback;

  constructor(
    file: File, progressCallback: ProgressCallback) {
    const CancelToken = axios.CancelToken;
    this.source = CancelToken.source();
    this.file = file;
    this.progressCallback = progressCallback;
    this.request = uploadFile(ApiRoute.uploadFile, this.file, this.source,
      progress => this.progressCallback(progress, this.file.name));
  }

  getRequestPromise() {
    return this.request;
  }

  cancelUpload() {
    this.source.cancel();
  }
}

export default UploadFileSession;