import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Post } from 'src/app/core/data/models/post.model';
import { Tag } from 'src/app/core/data/models/tag.model';
import { PostService } from 'src/app/core/data/services/post/post.service';
import { TagService } from 'src/app/core/data/services/tag/tag.service';

@Component({
  selector: 'app-posts-create-post',
  templateUrl: './posts-create-post.component.html',
  styleUrls: ['./posts-create-post.component.scss']
})
export class PostsCreatePostComponent implements OnInit {
  createPostForm!: FormGroup;
  imageData!: string;
  tags!: Tag[];
  post: Post = {} as Post;

  constructor(private tagService: TagService, private postService: PostService, private titleService: Title) { 
    this.titleService.setTitle("Posts - Create");
  }

  ngOnInit(): void {
    this.tagService.getTags()
      .subscribe((response) => {
        this.tags = response.tags;
      })

    this.createPostForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      tags: new FormControl(null),
      image: new FormControl(null)
    });
  }

  onFileSelect(event: Event) {
    this.createPostForm.controls['image'].markAsTouched();
    const file = (event.target as HTMLInputElement).files![0];
    if(file) {
      this.createPostForm.patchValue({ image: file });
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    } else {
      this.imageData = "";
      this.createPostForm.patchValue({ image: '' });
    }
  }

  onSubmit() {
    this.createPostForm.markAllAsTouched();

    if(this.createPostForm.valid) {
      this.post.title = this.createPostForm.value.title;
      this.post.content = this.createPostForm.value.content;
      this.post.tags = this.createPostForm.value.tags;
      this.post.imagePath = this.createPostForm.value.image;
      
      this.postService.addPost(this.post)
        .subscribe((response) => {
          console.log(response);
          // TODO: Create growler message that informs of character created
        })
    }
  }

}
