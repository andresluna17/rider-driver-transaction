import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

const url = 'https://sandbox.wompi.co/v1';
@Injectable()
export class WompiService {
  private acceptanceToken = '';
  constructor(private readonly httpService: HttpService) {}
  getAcceptanceToken() {
    return this.httpService.get(`${url}/`);
  }
}
