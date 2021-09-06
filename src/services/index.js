import FakeApi from './FAKE_InternalAPI';
import InternalApi from './InternalAPI'

const API = process.env.NODE_ENV === 'development' 
  ? FakeApi 
  : InternalApi;

export default API;