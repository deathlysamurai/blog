import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesCreateMoveComponent } from './moves-create-move.component';

describe('MovesCreateMoveComponent', () => {
  let component: MovesCreateMoveComponent;
  let fixture: ComponentFixture<MovesCreateMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovesCreateMoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovesCreateMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
