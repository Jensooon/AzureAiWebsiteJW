import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
            description:
              'Explore the capabilities of the Azure Computer Vision Service.',
            cols: 1,
            rows: 1,
            onClick: () => this.handleVisionClick(),
          },
          {
            title: 'Language',
            description:
              'Explore the capabilities of the Azure Language Service.',
            cols: 1,
            rows: 1,
            onClick: () => this.handleLanguageClick(),
          },
          {
            title: 'Speech',
            description:
              'Explore the capabilities of the Azure Speech Service.',
            cols: 1,
            rows: 1,
            onClick: () => this.handleSpeechClick(),
          },
          {
            title: 'Bot',
            description: 'Explore the capabilities of the Bot Speech Service.',
            cols: 1,
            rows: 1,
            onClick: () => this.handleSpeechClick(),
          },
          {
            title: 'Translate',
            description: 'Explore the capabilities of the Translate Service.',
            cols: 1,
            rows: 1,
            onClick: () => this.handleSpeechClick(),
          },
        ];
      }

      return [
        {
          title: 'Vision',
          description:
            'Explore the capabilities of the Azure Computer Vision Service.',
          cols: 1,
          rows: 1,
          onClick: () => this.handleVisionClick(),
        },
        {
          title: 'Language',
          description:
            'Explore the capabilities of the Azure Language Service.',
          cols: 1,
          rows: 1,
          onClick: () => this.handleLanguageClick(),
        },
        {
          title: 'Speech',
          description: 'Explore the capabilities of the Azure Speech Service.',
          cols: 1,
          rows: 1,
          onClick: () => this.handleSpeechClick(),
        },
        {
          title: 'Bot',
          description: 'Explore the capabilities of the Bot Speech Service.',
          cols: 1,
          rows: 1,
          onClick: () => this.handleBotClick(),
        },
        {
          title: 'Translate',
          description: 'Explore the capabilities of the Translate Service.',
          cols: 1,
          rows: 1,
          onClick: () => this.handleTranslateClick(),
        },
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

  handleBotClick() {
    this.router.navigate(['/bot']);
  }

  handleTranslateClick() {
    this.router.navigate(['/translate']);
  }

  onCardClick(card: any): void {
    if (card.onClick) {
      card.onClick();
    }
  }
}
