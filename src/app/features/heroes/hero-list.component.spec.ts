import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListComponent } from './hero-list.component';
import { HeroService } from '../../core/services/hero.service';
import { LoadingService } from '../../core/services/loading.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let heroService: any;
  let router: any;

  beforeEach(async () => {
    heroService = {
      getAll: vi.fn(),
      searchByName: vi.fn(),
      delete: vi.fn()
    };

    router = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HeroListComponent],
      providers: [
        { provide: HeroService, useValue: heroService },
        { provide: Router, useValue: router },
        LoadingService,
        provideNoopAnimations()
      ]
    }).compileComponents();

    const mockHero = {
      id: 1,
      name: 'Superman',
      biography: { fullName: 'Clark Kent', publisher: 'DC Comics' },
      images: { xs: 'test.jpg' },
      work: { occupation: 'Reporter' }
    };

    heroService.getAll.mockReturnValue(of([mockHero]));

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes on init', () => {
    expect(heroService.getAll).toHaveBeenCalled();
    expect(component.heroes().length).toBe(1);
  });

  it('should search heroes', () => {
    const mockHero = {
      id: 1,
      name: 'Superman',
      biography: { fullName: 'Clark Kent', publisher: 'DC Comics' },
      images: { xs: 'test.jpg' }
    };

    heroService.searchByName.mockReturnValue(of([mockHero]));

    component.searchTerm.set('super');
    component.onSearch();

    expect(heroService.searchByName).toHaveBeenCalledWith('super');
  });

  it('should navigate to add hero', () => {
    component.onAdd();
    expect(router.navigate).toHaveBeenCalledWith(['/heroes/new']);
  });
});