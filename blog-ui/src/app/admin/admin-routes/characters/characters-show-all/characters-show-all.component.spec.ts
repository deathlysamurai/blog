import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersShowAllComponent } from './characters-show-all.component';

describe('CharactersShowAllComponent', () => {
  let component: CharactersShowAllComponent;
  let fixture: ComponentFixture<CharactersShowAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersShowAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
