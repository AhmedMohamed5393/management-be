import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({ controllers: [AppController], providers: [AppService] }).compile();
    appController = app.get<AppController>(AppController);
  });
  describe('root', () => {
    it(`should return App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`, () => {
      expect(appController.gettingStarted()).toBe(`App is running at http://localhost:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
    });
  });
});
