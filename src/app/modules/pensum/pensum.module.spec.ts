import { PensumModule } from './pensum.module';

describe('PensumModule', () => {
  let pensumModule: PensumModule;

  beforeEach(() => {
    pensumModule = new PensumModule();
  });

  it('should create an instance', () => {
    expect(pensumModule).toBeTruthy();
  });
});
