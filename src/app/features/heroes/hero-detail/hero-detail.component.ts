import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroService } from '../../../core/services/hero.service';
import { LoadingService } from '../../../core/services/loading.service';
import { Hero } from '../../../core/models/hero.interface';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss'
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | null = null;
  loading$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private loadingService: LoadingService,
    private dialog: MatDialog
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadHero(+id);
    }
  }

  loadHero(id: number): void {
    this.loadingService.show();
    this.heroService.getById(id).subscribe({
      next: (hero) => {
        this.hero = hero || null;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.router.navigate(['/heroes']);
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/heroes']);
  }

  onEdit(): void {
    if (this.hero) {
      this.router.navigate(['/heroes/edit', this.hero.id]);
    }
  }

 onDelete(): void {
    if (!this.hero) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      panelClass: 'custom-dialog',
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar a ${this.hero.name}?`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.hero) {
        this.loadingService.show();
        this.heroService.delete(this.hero.id).subscribe({
          next: () => {
            this.router.navigate(['/heroes']);
          },
          error: () => this.loadingService.hide()
        });
      }
    });
  }
}