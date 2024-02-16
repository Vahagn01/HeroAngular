import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Hero } from '../interfaces/Hero';
import { HeroesService } from '../../services/heroes.service';
import { HeroComponent } from './hero.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let activatedRoute: ActivatedRoute;
  let heroesService: HeroesService;
  let router: Router;
  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HeroesService', ['getHeroByID']);
    const activatedRouteStub = {
      params: of({ id: 1 }) // Mock params
    };

    const heroesServiceStub = {
      getHeroByID: jasmine.createSpy().and.returnValue(of({ id: 1, nombre: 'Superman', casa: 'DC', bio: 'The Man of Steel' } as Hero))
    };

    const routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [HeroComponent, NavbarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: HeroesService, useValue: heroesServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();
    heroesServiceSpy = TestBed.inject(HeroesService) as jasmine.SpyObj<HeroesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    heroesService = TestBed.inject(HeroesService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch hero by ID on init', () => {
    const mockHero = {
      id: 1,
      nombre: 'Aquaman',
      bio: 'El poder más reconocido de Aquaman es la capacidad telepática para comunicarse con la vida marina, la cual puede convocar a grandes distancias.',
      img: 'assets/img/aquaman.png',
      aparicion: '1941-11-01',
      casa: 'DC',
    };
    heroesServiceSpy.getHeroByID.and.returnValue(of(mockHero));

    component.ngOnInit();

    expect(heroesServiceSpy.getHeroByID).toHaveBeenCalledWith(1);
    expect(component.hero).toEqual(mockHero);
    expect(component.loading).toBeFalse();
  });

  it('should navigate to /heroes when return() is called', () => {
    component.return();     
    expect(router.navigate).toHaveBeenCalledWith(['/heroes']);
  });
});
