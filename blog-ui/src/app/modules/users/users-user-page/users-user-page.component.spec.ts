import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUserPageComponent } from './users-user-page.component';

describe('UsersUserPageComponent', () => {
  let component: UsersUserPageComponent;
  let fixture: ComponentFixture<UsersUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersUserPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
