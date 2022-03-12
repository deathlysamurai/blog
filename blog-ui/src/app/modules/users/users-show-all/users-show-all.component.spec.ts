import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersShowAllComponent } from './users-show-all.component';

describe('UsersShowAllComponent', () => {
  let component: UsersShowAllComponent;
  let fixture: ComponentFixture<UsersShowAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersShowAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
