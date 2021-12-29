import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  gettingStarted(): string { return `App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`; }
}
