import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom, map } from 'rxjs';

const url = 'https://sandbox.wompi.co/v1';
const publicKey = 'pub_test_ULWoaTQjKJ2py5PKA9QHwgt2SRNVdB3x';
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
}
