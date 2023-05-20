import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsCreateTagComponent } from './tags-create-tag.component';

describe('TagsCreateTagComponent', () => {
  let component: TagsCreateTagComponent;
  let fixture: ComponentFixture<TagsCreateTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsCreateTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsCreateTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
