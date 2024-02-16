import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Hero } from '../components/interfaces/Hero';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private heroesUrl = 'api/initialHeroes';  

  constructor(private http: HttpClient) {}
 
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }
 
  getHeroByID(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
  } 
  
  getHeroByName(name: string): Observable<Hero[]> {
    return this.getHeroes().pipe(
      map(heroes => heroes.filter(hero => hero.nombre.toLowerCase().includes(name.toLowerCase())))
    );
  }
 
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero);
  }
 
  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put<any>(url, hero);
  }
 
  deleteHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete<any>(url);
  }
}
