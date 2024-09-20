import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardComponent, MatCardModule, MatCard],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
