import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Tag } from 'src/app/core/data/models/tag.model';
import { TagService } from 'src/app/core/data/services/tag/tag.service';

@Component({
  selector: 'app-tags-create-tag',
  templateUrl: './tags-create-tag.component.html',
  styleUrls: ['./tags-create-tag.component.scss']
})
export class TagsCreateTagComponent implements OnInit {
  createTagForm!: FormGroup;
  tag: Tag = {} as Tag;

  constructor(private tagService: TagService, private titleService: Title) { 
    this.titleService.setTitle("Tags - Create");
  }

  ngOnInit(): void {
    this.createTagForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.createTagForm.markAllAsTouched();

    if(this.createTagForm.valid) {
      this.tag.name = this.createTagForm.value.name;
      
      this.tagService.addTag(this.tag)
        .subscribe((response) => {
          console.log(response);
          // TODO: Create growler message that informs of character created
        })
    }
  }

}
