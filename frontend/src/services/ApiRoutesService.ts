/* coming from webpack define configuration when compiling for production */
// declare const API_LOCATION: string | undefined;

let LOCATION = 'localhost:8080';
// if (API_LOCATION) {
//   LOCATION = API_LOCATION;
// }
/* configures API ENDPOINT LOCATION */

const constructRequestUrl = (path: string): string => `${window.location.protocol}//${LOCATION}/${path}`;

const ApiRoute = {
  auth: constructRequestUrl('api/user/auth'),
  authRefresh: constructRequestUrl('api/user/refresh'),
  userSelf: constructRequestUrl('api/user/self'),

  getModelsPaged: constructRequestUrl('api/models'),
  getModel: constructRequestUrl('api/models/'),
  publishModel: constructRequestUrl('api/models'),
  updateModel: constructRequestUrl('api/models/'),
  deleteModel: constructRequestUrl('api/models/'),

  constructModelUrlWithId: (modelId: number) => constructRequestUrl('api/models/') + modelId,
};

export default ApiRoute;

export interface ModifyModelResponse {
  status: number,
  model_id: number,
  error: string | null,
}