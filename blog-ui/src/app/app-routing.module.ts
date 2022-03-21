import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home-page/home-page.module').then((m) => m.HomePageModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
  { path: 'characters', loadChildren: () => import('./modules/characters/characters.module').then((m) => m.CharactersModule) },
  { path: 'moves', loadChildren: () => import('./modules/moves/moves.module').then((m) => m.MovesModule) },
  { path: 'posts', loadChildren: () => import('./modules/posts/posts.module').then((m) => m.PostsModule) },
  { path: 'users', loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule) },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
