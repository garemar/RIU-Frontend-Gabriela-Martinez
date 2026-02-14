import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-icon">
        <mat-icon>warning_amber</mat-icon>
      </div>
      
      <h2 mat-dialog-title>{{ data.title }}</h2>
      
      <mat-dialog-content>
        <p>{{ data.message }}</p>
      </mat-dialog-content>
      
      <mat-dialog-actions>
        <button mat-stroked-button (click)="onCancel()">
          {{ data.cancelText || 'Cancelar' }}
        </button>
        <button mat-raised-button color="warn" (click)="onConfirm()">
          {{ data.confirmText || 'Confirmar' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 1rem;
    }

    .dialog-icon {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
      
      mat-icon {
        font-size: 4rem;
        width: 4rem;
        height: 4rem;
        color: #f44336;
      }
    }

    h2 {
      text-align: center;
      margin: 0 0 1.5rem 0;
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.87);
    }

    mat-dialog-content {
      text-align: center;
      padding: 0 1rem 2rem 1rem;
      
      p {
        margin: 0;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.7);
      }
    }

    mat-dialog-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      padding: 0;
      margin: 0;

      button {
        min-width: 120px;
      }
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}