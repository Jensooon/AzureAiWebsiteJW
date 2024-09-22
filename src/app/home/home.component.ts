import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCard } from '@angular/material/card';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardComponent, MatCardModule, MatCard, MatLabel],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
