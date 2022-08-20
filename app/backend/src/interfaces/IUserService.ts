import User from '../database/models/UserModel';
// import IService from './IService';

interface IUserService<T> {
  list(): Promise<User>
  login(): Promise<T>;
  teste(): string;
}

export default IUserService;
