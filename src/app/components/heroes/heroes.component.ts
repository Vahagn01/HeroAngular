import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service'; 
import { Subscription } from 'rxjs';
import { Hero } from '../interfaces/Hero';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
  hero:Hero = {
    id: 0,
    nombre: "",
    bio: "",
    img: "",
    aparicion: "",
    casa: ""
  }
  heroes: Hero[] = [];
  loading: boolean = true;  
  private heroesSubscription: Subscription | undefined;

  constructor(private heroesService: HeroesService ,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.loading = true;  
    this.heroesSubscription = this.heroesService.getHeroes().subscribe({
      next: heroes => {
        this.heroes = heroes;
        this.loading = false; // Indicar que los datos han sido cargados
      },
      error: error => {
        console.error('Error fetching heroes:', error);
        this.loading = false;  
      }
    });
  }

  buscarHeroes(nombre: string): void {
    if (nombre.trim() !== '') {
      this.loading = true;  
      this.heroesSubscription = this.heroesService.getHeroByName(nombre).subscribe({
        next: heroes => {
          this.heroes = heroes;
          this.loading = false;  
        },
        error: error => {
          console.error('Error fetching heroes by name:', error);
          this.loading = false; 
        }
      });
    } else {
      this.getHeroes(); 
    }
  }

  openEditModal(editModal:any) {
    this.modalService.open(editModal, { centered: true});
  }
  closeModal(){ 
    this.modalService.dismissAll();
  }
  submitForm() { 
    this.addHero(this.hero);
    this.getHeroes();
    this.closeModal();
  }

  addHero(hero: Hero) { 
    hero.img = "assets/img/hulk.png";
    const intId = parseInt(uuidv4().replace(/-/g, ''), 16);
    hero.id =  intId; 

    this.heroesSubscription = this.heroesService.addHero(hero).subscribe({
      next: (response) => {
        console.log('Héroe actualizado:', response); 
      },
      error: (error) => {
        console.error('Error al actualizar al héroe:', error); 
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => { 
      this.saveImage(e.target.result);
    };

    reader.readAsDataURL(file);
    
  }
  saveImage(imageData: any) {
    // Aquí puedes enviar la imagen al servidor o guardarla localmente en la carpeta de activos (assets)
  } 

  ngOnDestroy(): void { 
    this.heroesSubscription?.unsubscribe();
  }
}
