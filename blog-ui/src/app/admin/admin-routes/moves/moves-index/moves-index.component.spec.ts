import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesIndexComponent } from './moves-index.component';

describe('MovesIndexComponent', () => {
  let component: MovesIndexComponent;
  let fixture: ComponentFixture<MovesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
