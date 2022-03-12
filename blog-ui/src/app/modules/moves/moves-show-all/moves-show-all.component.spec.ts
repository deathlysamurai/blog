import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesShowAllComponent } from './moves-show-all.component';

describe('MovesShowAllComponent', () => {
  let component: MovesShowAllComponent;
  let fixture: ComponentFixture<MovesShowAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovesShowAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovesShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
