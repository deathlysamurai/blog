import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersCreateCharacterComponent } from './characters-create-character.component';

describe('CharactersCreateCharacterComponent', () => {
  let component: CharactersCreateCharacterComponent;
  let fixture: ComponentFixture<CharactersCreateCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersCreateCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersCreateCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
