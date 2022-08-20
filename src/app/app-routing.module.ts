import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { Login2Component } from './login2/login2.component';
import { LoginComponent } from './login/login.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { AnimationComponent } from './utilities/animation/animation.component';
import { BorderComponent } from './utilities/border/border.component';
import { ColorComponent } from './utilities/color/color.component';
import { OtherComponent } from './utilities/other/other.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login2', component: Login2Component },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
      { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
      { path: 'page1', title: 'page1', component: Page1Component },
      { path: 'page2', title: 'page2', component: Page2Component },
      {
        path: 'utilities', // 無元件路由(僅包含子路由)
        children: [
          { path: 'animation/:type', component: AnimationComponent },
          { path: 'border/:type', component: BorderComponent },
          { path: 'color/:type', component: ColorComponent },
          { path: 'other/:type', component: OtherComponent },
        ],
      },
      {
        path: 'utilities2',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./utilities2/utilities2.module').then(
            (m) => m.Utilities2Module
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
