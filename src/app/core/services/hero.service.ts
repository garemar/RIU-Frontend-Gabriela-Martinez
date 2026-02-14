import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, catchError, of, delay } from 'rxjs';
import { Hero, HeroCreate } from '../models/hero.interface';
import { HttpClient } from '@angular/common/http';


/**
 * HeroService - Gestión de héroes
 * 
 * Implementa un sistema híbrido que consume la API pública de superhéroes
 * (https://akabab.github.io/superhero-api) y permite crear héroes personalizados
 * que se almacenan localmente en memoria.
 * 
 * Los héroes de la API son de solo lectura, mientras que los custom pueden
 * ser editados y eliminados.
 */

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly API_URL = 'https://akabab.github.io/superhero-api/api';
  private localHeroes: Hero[] = [];
  private allHeroes: Hero[] = [];
  private heroesLoaded = false;

  constructor(private http: HttpClient) {}

  private loadHeroesFromAPI(): Observable<Hero[]> {
    if (this.heroesLoaded) {
      return of([...this.allHeroes, ...this.localHeroes]);
    }

    return this.http.get<Hero[]>(`${this.API_URL}/all.json`).pipe(
      map(heroes => {
        this.allHeroes = heroes;
        this.heroesLoaded = true;
        return [...this.allHeroes, ...this.localHeroes];
      }),
      catchError(() => of([...this.localHeroes]))
    );
  }

  getAll(): Observable<Hero[]> {
    return this.loadHeroesFromAPI().pipe(delay(500));
  }

  getById(id: number): Observable<Hero | undefined> {
    return this.loadHeroesFromAPI().pipe(
      map(heroes => heroes.find(h => h.id === id)),
      delay(300)
    );
  }

  searchByName(term: string): Observable<Hero[]> {
    return this.loadHeroesFromAPI().pipe(
      map(heroes => heroes.filter(h => 
        h.name.toLowerCase().includes(term.toLowerCase())
      )),
      delay(300)
    );
  }

  create(heroData: HeroCreate): Observable<Hero> {
    const newHero: Hero = {
      id: Date.now(),
      name: heroData.name,
      powerstats: {
        intelligence: 0,
        strength: 0,
        speed: 0,
        durability: 0,
        power: 0,
        combat: 0
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
        xs: 'https://via.placeholder.com/32x48',
        sm: 'https://via.placeholder.com/64x96',
        md: 'https://via.placeholder.com/128x192',
        lg: 'https://via.placeholder.com/256x384'
      }
    };

    this.localHeroes.push(newHero);
    return of(newHero).pipe(delay(500));
  }

  update(id: number, heroData: Partial<Hero>): Observable<Hero | undefined> {
    const index = this.localHeroes.findIndex(h => h.id === id);
    if (index !== -1) {
      this.localHeroes[index] = { ...this.localHeroes[index], ...heroData };
      return of(this.localHeroes[index]).pipe(delay(500));
    }
    return of(undefined).pipe(delay(500));
  }

  delete(id: number): Observable<boolean> {
    const index = this.localHeroes.findIndex(h => h.id === id);
    if (index !== -1) {
      this.localHeroes.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }
}