import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { HeroCreate } from '../models/hero.interface';
import { firstValueFrom } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all heroes from API', async () => {
    const mockHeroes = [
      { id: 1, name: 'Superman', biography: { publisher: 'DC Comics' } }
    ];

    const promise = firstValueFrom(service.getAll());
    
    const req = httpMock.expectOne('https://akabab.github.io/superhero-api/api/all.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);

    const heroes = await promise;
    expect(heroes.length).toBeGreaterThan(0);
  });

  it('should create a new hero', async () => {
    const newHero: HeroCreate = {
      name: 'Flash',
      publisher: 'DC Comics',
      occupation: 'Forensic Scientist'
    };

    const hero = await firstValueFrom(service.create(newHero));
    expect(hero.id).toBeDefined();
    expect(hero.name).toBe('Flash');
    expect(hero.biography.publisher).toBe('DC Comics');
  });

  it('should search heroes by name', async () => {
    const mockHeroes = [
      { id: 1, name: 'Superman', biography: { publisher: 'DC Comics' } },
      { id: 2, name: 'Batman', biography: { publisher: 'DC Comics' } }
    ];

    const promise = firstValueFrom(service.searchByName('man'));
    
    const req = httpMock.expectOne('https://akabab.github.io/superhero-api/api/all.json');
    req.flush(mockHeroes);

    const heroes = await promise;
    expect(heroes.length).toBe(2);
  });
});