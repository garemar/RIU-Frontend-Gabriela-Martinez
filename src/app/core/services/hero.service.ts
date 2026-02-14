/**
 * HeroService - Gestión de héroes
 * 
 * Carga inicial desde la API pública de superhéroes y almacena todo en memoria.
 * Después de la carga inicial, todos los héroes (API + custom) son tratados igual
 * y pueden ser editados o eliminados.
 */
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, catchError, of, delay, tap } from 'rxjs';
import { Hero, HeroCreate } from '../models/hero.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly API_URL = 'https://akabab.github.io/superhero-api/api';
  private heroes: Hero[] = [];
  private heroesLoaded = false;
  private heroesSubject = new BehaviorSubject<Hero[]>([]);

  constructor(private http: HttpClient) {
    this.loadInitialHeroes();
  }

  private loadInitialHeroes(): void {
    this.http.get<Hero[]>(`${this.API_URL}/all.json`).pipe(
      catchError(() => of([]))
    ).subscribe(heroes => {
      this.heroes = heroes;
      this.heroesLoaded = true;
      this.heroesSubject.next(this.heroes);
    });
  }

  getAll(): Observable<Hero[]> {
    if (this.heroesLoaded) {
      return of(this.heroes).pipe(delay(300));
    }
    return this.heroesSubject.pipe(
      map(() => this.heroes),
      delay(300)
    );
  }

  getById(id: number): Observable<Hero | undefined> {
    return this.getAll().pipe(
      map(heroes => heroes.find(h => h.id === id))
    );
  }

  searchByName(term: string): Observable<Hero[]> {
    return this.getAll().pipe(
      map(heroes => heroes.filter(h => 
        h.name.toLowerCase().includes(term.toLowerCase())
      ))
    );
  }

create(heroData: HeroCreate): Observable<Hero> {
    const imageUrl = heroData.imageUrl || 'https://via.placeholder.com/256x384/9c27b0/ffffff?text=Hero';
    
    const newHero: Hero = {
      id: Date.now(),
      name: heroData.name,
      powerstats: {
        intelligence: 50,
        strength: 50,
        speed: 50,
        durability: 50,
        power: 50,
        combat: 50
      },
      biography: {
        fullName: heroData.name,
        alterEgos: 'No alter egos found.',
        aliases: [],
        placeOfBirth: '-',
        firstAppearance: heroData.firstAppearance || '-',
        publisher: heroData.publisher || 'Custom',
        alignment: 'good'
      },
      appearance: {
        gender: '-',
        race: null as any,
        height: ['-'],
        weight: ['-'],
        eyeColor: '-',
        hairColor: '-'
      },
      work: {
        occupation: heroData.occupation || '-',
        base: '-'
      },
      connections: {
        groupAffiliation: '-',
        relatives: '-'
      },
      images: {
        xs: imageUrl,
        sm: imageUrl,
        md: imageUrl,
        lg: imageUrl
      }
    };

    this.heroes.unshift(newHero);
    this.heroesSubject.next(this.heroes);
    return of(newHero).pipe(delay(500));
  }

  update(id: number, heroData: Partial<Hero>): Observable<Hero | undefined> {
    const index = this.heroes.findIndex(h => h.id === id);
    if (index !== -1) {
      this.heroes[index] = { ...this.heroes[index], ...heroData };
      this.heroesSubject.next(this.heroes);
      return of(this.heroes[index]).pipe(delay(500));
    }
    return of(undefined).pipe(delay(500));
  }

  delete(id: number): Observable<boolean> {
    const index = this.heroes.findIndex(h => h.id === id);
    if (index !== -1) {
      this.heroes.splice(index, 1);
      this.heroesSubject.next(this.heroes);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }
}