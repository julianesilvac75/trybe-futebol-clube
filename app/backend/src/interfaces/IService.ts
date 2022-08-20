interface IService<T> {
  list(): Promise<T>
}

export default IService;
