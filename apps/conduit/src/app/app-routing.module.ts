import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthGuard } from '@example-app/auth/services';
// import { NotFoundPageComponent } from '@example-app/core/containers';

export const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('@nx-fullstack-realworld/frontend/users').then(
        (m) => m.FrontendUsersModule
      ),
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
