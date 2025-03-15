/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDto } from '../models/LoginDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AuthService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public authControllerRegister(
    requestBody: RegisterDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/register',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public authControllerLogin(
    requestBody: LoginDto,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public authControllerGetProfile(): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/auth/me',
    });
  }
}
