import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroService } from '../../../core/services/hero.service';
import { LoadingService } from '../../../core/services/loading.service';
import { UppercaseInputDirective } from '../../../shared/directives/uppercase-input.directive';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    UppercaseInputDirective
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup;
  isEditMode = false;
  heroId: number | null = null;
  loading$;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loading$ = this.loadingService.loading$;
    this.heroForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      fullName: [''],
      publisher: [''],
      occupation: [''],
      firstAppearance: [''],
      placeOfBirth: [''],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroId = id ? +id : null;
    this.isEditMode = !!this.heroId;

    if (this.isEditMode && this.heroId) {
      this.loadHero(this.heroId);
    }
  }

  loadHero(id: number): void {
    this.loadingService.show();
    this.heroService.getById(id).subscribe({
      next: (hero) => {
        if (hero) {
          this.heroForm.patchValue({
            name: hero.name,
            fullName: hero.biography.fullName,
            publisher: hero.biography.publisher,
            occupation: hero.work.occupation,
            firstAppearance: hero.biography.firstAppearance,
            placeOfBirth: hero.biography.placeOfBirth,
            imageUrl: hero.images.md
          });
        }
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
        this.router.navigate(['/heroes']);
      }
    });
  }

  onSubmit(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    this.loadingService.show();

    if (this.isEditMode && this.heroId) {
      const imageUrl = this.heroForm.value.imageUrl || 'https://via.placeholder.com/256x384/9c27b0/ffffff?text=Hero';
      
      const updatedData = {
        name: this.heroForm.value.name,
        biography: {
          fullName: this.heroForm.value.fullName || this.heroForm.value.name,
          publisher: this.heroForm.value.publisher || 'Unknown',
          firstAppearance: this.heroForm.value.firstAppearance || '-',
          placeOfBirth: this.heroForm.value.placeOfBirth || '-',
          alterEgos: 'No alter egos found.',
          aliases: [],
          alignment: 'good'
        },
        work: {
          occupation: this.heroForm.value.occupation || '-',
          base: '-'
        },
        images: {
          xs: imageUrl,
          sm: imageUrl,
          md: imageUrl,
          lg: imageUrl
        }
      };
      
      this.heroService.update(this.heroId, updatedData).subscribe({
        next: () => {
          this.loadingService.hide();
          this.router.navigate(['/heroes']);
        },
        error: () => this.loadingService.hide()
      });
    } else {
      const createData = {
        name: this.heroForm.value.name,
        publisher: this.heroForm.value.publisher,
        occupation: this.heroForm.value.occupation,
        firstAppearance: this.heroForm.value.firstAppearance,
        imageUrl: this.heroForm.value.imageUrl
      };
      
      this.heroService.create(createData).subscribe({
        next: () => {
          this.loadingService.hide();
          this.router.navigate(['/heroes']);
        },
        error: () => this.loadingService.hide()
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/heroes']);
  }

  getErrorMessage(field: string): string {
    const control = this.heroForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('minlength')) {
      return 'Mínimo 3 caracteres';
    }
    return '';
  }
}