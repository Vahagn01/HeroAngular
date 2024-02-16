import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Hero } from '../interfaces/Hero';
import { HeroesService } from '../../services/heroes.service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html', 
  styleUrl: './hero-card.component.css'
})
export class HeroCardComponent implements OnInit {
  
  @Input()  hero:any = {};
  @Input()  idx?:number;  
  heroCopy!: Hero;
  private heroesSubscription: Subscription | undefined;
  @Output() updateList = new EventEmitter<string>(); 

  constructor(private router:Router, private heroesService: HeroesService,private modalService: NgbModal) { }

  ngOnInit(): void { 
    this.heroCopy = { ...this.hero };
  }
  viewHero(){
    this.router.navigate(['/hero',this.idx]);
  }   

  openModal(editModal:any) {
    this.modalService.open(editModal, { centered: true});
  }
 
  openEditModal(editModal:any) {
    this.modalService.open(editModal, { centered: true});
  }

  closeModal(){
    this.heroCopy = { ...this.hero };
    this.modalService.dismissAll();
  }
  
  submitForm() {
    console.log('Datos del formulario:', this.heroCopy); 
    this.updateHero(this.heroCopy);
    this.updateList.emit();
    this.closeModal();
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

  updateHero(heroCopy: Hero) { 
    this.heroesSubscription = this.heroesService.updateHero(heroCopy).subscribe({
      next: (response) => {
        console.log('Héroe actualizado:', response); 
      },
      error: (error) => {
        console.error('Error al actualizar al héroe:', error); 
      }
    });
  }

  deleteHero(){
    this.heroesSubscription = this.heroesService.deleteHero(this.hero).subscribe({
      next: () => { 
          this.updateList.emit(); 
      },
      error: (error) => {
        console.error('Error al borrar al héroe:', error); 
      }
    });
  }

  ngOnDestroy(): void { 
    this.heroesSubscription?.unsubscribe();
  }
}
