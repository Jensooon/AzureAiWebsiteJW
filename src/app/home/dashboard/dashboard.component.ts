import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { title } from 'process';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DashboardComponent,
  ],
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private router: Router) {}

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          {
            title: 'Vision',
            cols: 1,
            rows: 1,
            onClick: () => this.handleVisionClick(),
          },
          {
            title: 'Language',
            cols: 1,
            rows: 1,
            onClick: () => this.handleLanguageClick(),
          },
          {
            title: 'Speech',
            cols: 1,
            rows: 1,
            onClick: () => this.handleSpeechClick(),
          },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        {
          title: 'Vision',
          cols: 1,
          rows: 1,
          onClick: () => this.handleVisionClick(),
        },
        {
          title: 'Language',
          cols: 1,
          rows: 1,
          onClick: () => this.handleLanguageClick(),
        },
        {
          title: 'Speech',
          cols: 1,
          rows: 1,
          onClick: () => this.handleSpeechClick(),
        },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );

  handleVisionClick() {
    this.router.navigate(['/vision']);
  }

  handleLanguageClick() {
    this.router.navigate(['/language']);
  }

  handleSpeechClick() {
    this.router.navigate(['/speech']);
  }

  onCardClick(card: any): void {
    if (card.onClick) {
      card.onClick();
    }
  }
}
