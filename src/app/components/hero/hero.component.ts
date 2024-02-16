import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'; 
import {HeroesService} from '../../services/heroes.service'; 
import { Hero } from '../interfaces/Hero';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})

export class HeroComponent  { 
  loading: boolean = true;  
  hero!: Hero; 

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id']; 
      this.heroesService.getHeroByID(id).subscribe({
        next: hero => {
          this.hero = hero;
          this.loading = false; 
        },
        error: error => {
          console.error('Error fetching heroes:', error);
          this.loading = false;  
        }
      });
    });
  } 
   return(){
    this.router.navigate(['/heroes']); 
   }
}