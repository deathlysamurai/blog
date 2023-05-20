import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersCharacterPageComponent } from './characters-character-page.component';

describe('CharactersCharacterPageComponent', () => {
  let component: CharactersCharacterPageComponent;
  let fixture: ComponentFixture<CharactersCharacterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersCharacterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersCharacterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
