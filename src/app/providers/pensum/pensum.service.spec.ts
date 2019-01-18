import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PensumService } from './pensum.service';
import { AdministradorDragComponent } from '../../pensum/components/administrador-drag/administrador-drag.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('PensumService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [PensumService],
    imports: [
      HttpClientTestingModule,
      DragDropModule
    ],
  }));

  it('should be created', () => {
    const service: PensumService = TestBed.get(PensumService);
    expect(service).toBeTruthy();
  });
});
