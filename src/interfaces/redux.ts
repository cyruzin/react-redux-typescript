export default interface IBaseAction<T, U> {
  type: T
  payload?: U
}
