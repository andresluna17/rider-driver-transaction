import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map, catchError } from 'rxjs';
import { Rider } from 'src/rider/entities/rider.entity';

const url = 'https://sandbox.wompi.co/v1';
const publicKey = 'pub_test_ULWoaTQjKJ2py5PKA9QHwgt2SRNVdB3x';
const privateKey = 'prv_test_X4jl1NDRKucGSOhvpsoOyK8sak0lT7Kw';
@Injectable()
export class WompiService {
  private acceptanceToken = '';
  constructor(private readonly httpService: HttpService) {}
  async getAcceptanceToken() {
    return await firstValueFrom(
      this.httpService
        .get(`${url}/merchants/${publicKey}`, {
          headers: {
            Authorization: `Bearer ${publicKey}`,
          },
        })
        .pipe(
          map((res: AxiosResponse<any>) => {
            return res.data.data.presigned_acceptance.acceptance_token;
          }),
        ),
    );
  }

  async createTransaction(price: number, rider: Rider, tokenCardId, reference) {
    this.acceptanceToken =
      this.acceptanceToken != ''
        ? this.acceptanceToken
        : await this.getAcceptanceToken();
    return await firstValueFrom(
      this.httpService
        .post(
          `${url}/transactions`,
          {
            acceptance_token: this.acceptanceToken,
            amount_in_cents: price * 100,
            currency: 'COP',
            customer_email: rider.email,
            payment_method: {
              type: 'CARD',
              token: tokenCardId,
              installments: 1,
            },
            redirect_url: 'https://mitienda.com.co/pago/resultado',
            reference,
            expiration_time: '2024-06-09T20:28:50.000Z',
            customer_data: {
              phone_number: '573307654321',
              full_name: rider.name,
              legal_id: '1234567890',
              legal_id_type: 'CC',
            },
            shipping_address: {
              address_line_1: 'Calle 34 # 56 - 78',
              address_line_2: 'Apartamento 502, Torre I',
              country: 'CO',
              region: 'Cundinamarca',
              city: 'Bogotá',
              name: 'Pepe Perez',
              phone_number: '573109999999',
              postal_code: '111111',
            },
          },
          {
            headers: {
              Authorization: `Bearer ${privateKey}`,
            },
          },
        )
        .pipe(
          map((res: AxiosResponse<any>) => {
            return res.data.data;
          }),
          catchError((error) => {
            console.log(JSON.stringify(error.response.data), price);
            return error;
          }),
        ),
    );
  }
}
