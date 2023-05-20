import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersIndexComponent } from './characters-index.component';

describe('CharactersIndexComponent', () => {
  let component: CharactersIndexComponent;
  let fixture: ComponentFixture<CharactersIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
