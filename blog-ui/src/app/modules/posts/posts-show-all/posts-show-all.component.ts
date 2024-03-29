import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/data/services/post/post.service';
import { Post } from 'src/app/core/data/models/post.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-posts-show-all',
  templateUrl: './posts-show-all.component.html',
  styleUrls: ['./posts-show-all.component.scss']
})
export class PostsShowAllComponent implements OnInit {
  posts!: Post[];
  totalPosts!: number;

  constructor(private postService: PostService, private titleService: Title) {
    this.titleService.setTitle("Posts");
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts()
    .subscribe((response) => {
      console.log(response);
      this.totalPosts = response.count;
      this.posts = response.posts;
    })
  }

}
