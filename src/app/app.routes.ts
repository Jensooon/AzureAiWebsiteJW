import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComputerVisionComponent } from './computer-vision/computer-vision.component';
import { LanguageComponent } from './language/language.component';
import { SpeechComponent } from './speech/speech.component';
import { BotComponent } from './bot/bot.component';
import { TranslateComponent } from './translate/translate.component';

const routeConfig: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'vision',
    component: ComputerVisionComponent,
    title: 'Computer Vision Capabilities',
  },
  {
    path: 'language',
    component: LanguageComponent,
    title: 'Language Capabilities',
  },
  {
    path: 'speech',
    component: SpeechComponent,
    title: 'Speech Capabilities',
  },
  {
    path: 'bot',
    component: BotComponent,
    title: 'Bot Capabilities',
  },
  { path: 'translate', component: TranslateComponent, title: 'Translate' },

  //TODO: Make home default path once done testing with language
  { path: '', redirectTo: '/language', pathMatch: 'full' },
];

export default routeConfig;
