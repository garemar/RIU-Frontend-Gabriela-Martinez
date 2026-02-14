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

  const mockHeroes = [
    { 
      id: 1, 
      name: 'Superman', 
      biography: { publisher: 'DC Comics', fullName: 'Clark Kent' },
      images: { xs: 'test.jpg', sm: 'test.jpg', md: 'test.jpg', lg: 'test.jpg' },
      work: { occupation: 'Reporter' },
      powerstats: { intelligence: 90, strength: 100, speed: 100, durability: 100, power: 100, combat: 85 },
      appearance: { gender: 'Male', race: 'Kryptonian', height: ['6\'3'], weight: ['225 lb'], eyeColor: 'Blue', hairColor: 'Black' },
      connections: { groupAffiliation: 'Justice League', relatives: 'Lois Lane' }
    },
    { 
      id: 2, 
      name: 'Batman', 
      biography: { publisher: 'DC Comics', fullName: 'Bruce Wayne' },
      images: { xs: 'test.jpg', sm: 'test.jpg', md: 'test.jpg', lg: 'test.jpg' },
      work: { occupation: 'CEO' },
      powerstats: { intelligence: 100, strength: 26, speed: 27, durability: 50, power: 47, combat: 100 },
      appearance: { gender: 'Male', race: 'Human', height: ['6\'2'], weight: ['210 lb'], eyeColor: 'Blue', hairColor: 'Black' },
      connections: { groupAffiliation: 'Justice League', relatives: 'Alfred Pennyworth' }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Interceptar y responder la carga inicial automática
    const req = httpMock.expectOne('https://akabab.github.io/superhero-api/api/all.json');
    req.flush(mockHeroes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all heroes from API', async () => {
    const heroes = await firstValueFrom(service.getAll());
    expect(heroes.length).toBeGreaterThan(0);
    expect(heroes[0].name).toBe('Superman');
  });

  it('should create a new hero', async () => {
    const newHero: HeroCreate = {
      name: 'Flash',
      publisher: 'DC Comics',
      occupation: 'Forensic Scientist',
      imageUrl: 'https://test.com/flash.jpg'
    };

    const hero = await firstValueFrom(service.create(newHero));
    expect(hero.id).toBeDefined();
    expect(hero.name).toBe('Flash');
    expect(hero.biography.publisher).toBe('DC Comics');
  });

  it('should search heroes by name', async () => {
    const heroes = await firstValueFrom(service.searchByName('man'));
    expect(heroes.length).toBe(2);
  });
  it('should get hero by id', async () => {
    const hero = await firstValueFrom(service.getById(1));
    expect(hero).toBeDefined();
    expect(hero?.name).toBe('Superman');
  });

  it('should update a hero', async () => {
    const updatedHero = await firstValueFrom(service.update(1, { name: 'Superman Updated' }));
    expect(updatedHero?.name).toBe('Superman Updated');
  });

  it('should delete a hero', async () => {
    const result = await firstValueFrom(service.delete(1));
    expect(result).toBe(true);
  });

  it('should return false when deleting non-existent hero', async () => {
    const result = await firstValueFrom(service.delete(9999));
    expect(result).toBe(false);
  });
});