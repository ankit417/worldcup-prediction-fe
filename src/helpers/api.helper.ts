import axios, { Method, AxiosRequestConfig } from 'axios'
import { getCookie } from '.'
// import { getCookie } from "./cookie.helper";

interface ApiGeneratorParams {
  baseURL: string
}

interface ApiConfigParams {
  file?: boolean
  headers?: any
  fileUploadProgress?: (progress: number) => void
  fileDownloadProgress?: (progress: number) => void
}

export function apiGenerator({ baseURL }: ApiGeneratorParams) {
  return async function api(
    url: string,
    method?: Method,
    body?: any,
    apiConfig?: ApiConfigParams
  ) {
    const token = getCookie('token')
    const config: AxiosRequestConfig = {
      method: 'GET',
      baseURL,
      url,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    if (method) config.method = method
    if (body) config.data = body
    if (apiConfig?.headers) config.headers = apiConfig.headers

    // For file
    if (apiConfig?.file) {
      config.headers = {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer ${token}`,
      }
      // FOR UPLOAD
      config.onUploadProgress = function (progressEvent: any) {
        let progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        apiConfig?.fileUploadProgress && apiConfig.fileUploadProgress(progress)
      }
      // FOR DOWNLOAD
      config.onDownloadProgress = function (progressEvent: any) {
        let progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        apiConfig?.fileDownloadProgress &&
          apiConfig.fileDownloadProgress(progress)
      }
    }

    let response
    try {
      response = await axios(config)
      return response
    } catch (e: any) {
      throw new Error(
        e?.response?.data?.message || e?.response?.data || e?.message
      )
    }
  }
}
