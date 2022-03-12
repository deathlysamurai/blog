import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsShowAllComponent } from './posts-show-all.component';

describe('PostsShowAllComponent', () => {
  let component: PostsShowAllComponent;
  let fixture: ComponentFixture<PostsShowAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsShowAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsShowAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
