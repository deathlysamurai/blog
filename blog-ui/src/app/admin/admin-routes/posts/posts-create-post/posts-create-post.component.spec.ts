import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCreatePostComponent } from './posts-create-post.component';

describe('PostsCreatePostComponent', () => {
  let component: PostsCreatePostComponent;
  let fixture: ComponentFixture<PostsCreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsCreatePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
