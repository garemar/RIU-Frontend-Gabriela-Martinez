import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroService } from '../../../core/services/hero.service';
import { LoadingService } from '../../../core/services/loading.service';
import { Hero } from '../../../core/models/hero.interface';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';



/**
 * TODO: Implementar filtros por publisher/universo (marvel, dc, etc)
 * FIXME: La paginación actual funciona pero podría optimizarse con virtual scroll
 * para manejar los 563 héroes de forma más eficiente
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
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule
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
  
  pageSize = 12;
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
    this.router.navigate(['/heroes/detail', hero.id]);
  }
  onAdd(): void {
    this.router.navigate(['/heroes/new']);
  }

   onEdit(hero: Hero): void {
    this.router.navigate(['/heroes/edit', hero.id]);
  }

onDelete(hero: Hero): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      panelClass: 'custom-dialog',
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar a ${hero.name}?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadingService.show();
        this.heroService.delete(hero.id).subscribe({
          next: () => {
            this.loadHeroes();
          },
          error: () => this.loadingService.hide()
        });
      }
    });
  }
}