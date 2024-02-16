import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component'; 
import {HeroComponent} from './components/hero/hero.component' 


const ROUTES : Routes = [  
    {path: 'about', component: AboutComponent},
    {path: 'heroes', component: HeroesComponent} ,
    {path: 'hero/:id', component: HeroComponent} , 
    {path : '**',pathMatch:'full',redirectTo:'heroes'}
]; 

 
export const APP_ROUTING  = RouterModule.forRoot(ROUTES);