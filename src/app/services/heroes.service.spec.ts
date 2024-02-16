import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { Hero } from '../components/interfaces/Hero';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService]
    });
    service = TestBed.inject(HeroesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve heroes from the API via GET', () => {
    const mockHeroes: Hero[] = [
      { id: 1, nombre: 'Batman', bio: 'El caballero oscuro', img: 'batman.jpg', aparicion: '1939', casa: 'DC' },
      { id: 2, nombre: 'Spider-Man', bio: 'El Hombre Araña', img: 'spiderman.jpg', aparicion: '1962', casa: 'Marvel' }
    ];

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpTestingController.expectOne('api/initialHeroes');
    expect(req.request.method).toEqual('GET');

    req.flush(mockHeroes);
  });

  it('should retrieve a hero by ID from the API via GET', () => {
    const mockHero: Hero = { id: 1, nombre: 'Batman', bio: 'El caballero oscuro', img: 'batman.jpg', aparicion: '1939', casa: 'DC' };
    const heroId = 1;

    service.getHeroByID(heroId).subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpTestingController.expectOne(`api/initialHeroes/${heroId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockHero);
  });

  it('should add a hero via POST', () => {
    const newHero: Hero = {id:3212, nombre: 'Wolverine', bio: 'Logan', img: 'wolverine.jpg', aparicion: '1974', casa: 'Marvel' };

    service.addHero(newHero).subscribe(hero => {
      expect(hero).toEqual(newHero);
    });

    const req = httpTestingController.expectOne('api/initialHeroes');
    expect(req.request.method).toEqual('POST');

    req.flush(newHero);
  });

  it('should update a hero via PUT', () => {
    const updatedHero: Hero = { id: 1, nombre: 'Superman', bio: 'El hombre de acero', img: 'superman.jpg', aparicion: '1938', casa: 'DC' };

    service.updateHero(updatedHero).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`api/initialHeroes/${updatedHero.id}`);
    expect(req.request.method).toEqual('PUT');

    req.flush({});
  });

  it('should delete a hero via DELETE', () => {
    const heroToDelete: Hero = { id: 1, nombre: 'Batman', bio: 'El caballero oscuro', img: 'batman.jpg', aparicion: '1939', casa: 'DC' };

    service.deleteHero(heroToDelete).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`api/initialHeroes/${heroToDelete.id}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  });
});
