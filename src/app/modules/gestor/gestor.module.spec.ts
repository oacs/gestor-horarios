import { GestorModule } from './gestor.module';

describe('GestorModule', () => {
  let gestorModule: GestorModule;

  beforeEach(() => {
    gestorModule = new GestorModule();
  });

  it('should create an instance', () => {
    expect(gestorModule).toBeTruthy();
  });
});
