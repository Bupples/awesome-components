import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostsResolver } from './resolvers/posts.resolver';
import { PostsService } from './services/posts.service';
import { SocialMediaRoutingModule } from './social-media-routing.module';


@NgModule({
  declarations: [
    PostListComponent,
    PostListItemComponent
  ],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    SharedModule
  ],
  providers: [
    PostsService,
    PostsResolver
  ]
})
export class SocialMediaModule { }
