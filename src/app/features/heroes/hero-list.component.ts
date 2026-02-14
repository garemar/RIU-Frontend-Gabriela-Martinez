import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroService } from '../../core/services/hero.service';
import { LoadingService } from '../../core/services/loading.service';
import { Hero } from '../../core/models/hero.interface';


/**
 * TODO: Implementar vista de detalle del héroe en lugar de alert()
 * TODO: Agregar filtros por publisher/universo
 * TODO: Mejorar paginación para manejar grandes volúmenes (la API tiene 563 héroes)
 */

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss'
})
export class HeroListComponent implements OnInit {
  heroes = signal<Hero[]>([]);
  displayedHeroes = signal<Hero[]>([]);
  searchTerm = signal('');
  loading$;
  
  displayedColumns: string[] = ['image', 'name', 'fullName', 'publisher', 'actions'];
  
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  constructor(
    private heroService: HeroService,
    private loadingService: LoadingService,
    private router: Router,
    private dialog: MatDialog
  ) {
     this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.loadingService.show();
    this.heroService.getAll().subscribe({
      next: (heroes) => {
        this.heroes.set(heroes);
        this.totalItems = heroes.length;
        this.updateDisplayedHeroes();
        this.loadingService.hide();
      },
      error: () => this.loadingService.hide()
    });
  }

  onSearch(): void {
    const term = this.searchTerm();
    if (term.trim()) {
      this.loadingService.show();
      this.heroService.searchByName(term).subscribe({
        next: (heroes) => {
          this.heroes.set(heroes);
          this.totalItems = heroes.length;
          this.pageIndex = 0;
          this.updateDisplayedHeroes();
          this.loadingService.hide();
        },
        error: () => this.loadingService.hide()
      });
    } else {
      this.loadHeroes();
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedHeroes();
  }

  updateDisplayedHeroes(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedHeroes.set(this.heroes().slice(startIndex, endIndex));
  }

  onView(hero: Hero): void {
    alert(`Nombre: ${hero.name}\nNombre Real: ${hero.biography.fullName}\nPublisher: ${hero.biography.publisher}\nOcupación: ${hero.work.occupation}`);
  }
  onAdd(): void {
    this.router.navigate(['/heroes/new']);
  }

   onEdit(hero: Hero): void {
    this.router.navigate(['/heroes/edit', hero.id]);
  }

  onDelete(hero: Hero): void {
    if (confirm(`¿Estás seguro de eliminar a ${hero.name}?`)) {
      this.loadingService.show();
      this.heroService.delete(hero.id).subscribe({
        next: () => {
          this.loadHeroes();
        },
        error: () => this.loadingService.hide()
      });
    }
  }
}