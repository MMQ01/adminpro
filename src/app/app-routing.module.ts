import { PagesRoutingModule } from './pages/pages.routing';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';


const routes: Routes=[
  
  //path: '/dashboard ' pagesrouting
  //path: '/auth ' AuthRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**' , component: NopagefoundComponent},
]

@NgModule({
  declarations: [],
  imports: [
            RouterModule.forRoot(routes), 
            PagesRoutingModule,
            AuthRoutingModule
          ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
