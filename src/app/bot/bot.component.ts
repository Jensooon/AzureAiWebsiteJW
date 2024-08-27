import { DirectLine } from 'botframework-directlinejs';
import * as WebChat from 'botframework-webchat';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bot',
  standalone: true,
  imports: [],
  templateUrl: './bot.component.html',
  styleUrl: './bot.component.scss',
})
export class BotComponent implements OnInit {
  @ViewChild('botWindow') botWindowElement: ElementRef | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeWebChat();
    }
  }

  private initializeWebChat() {
    // Import the modules dynamically
    import('botframework-directlinejs').then(({ DirectLine }) => {
      import('botframework-webchat').then((WebChat) => {
        const directLine = new DirectLine({
          token: 'kgcvu2dEsR4.QUycAbDI7M0z0ylz1CDq9POw8GZpgeNxO5Cx5Yl_Ppo',
        });

        WebChat.renderWebChat(
          {
            directLine: directLine,
            userID: 'TestUser',
          },
          this.botWindowElement?.nativeElement
        );
      });
    });
  }
}
