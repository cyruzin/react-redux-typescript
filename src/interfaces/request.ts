export interface IRequest {
    url: string,
    method: string,
    headers?: any,
    params?: any,
    data?: any
}

export interface IRequestError {
    default?: string,
    noResponse?: string,
    network?: string
}