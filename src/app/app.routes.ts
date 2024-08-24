import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComputerVisionComponent } from './computer-vision/computer-vision.component';
import { LanguageComponent } from './language/language.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

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

  //TODO: Make home default path once done testing with language
  { path: '', redirectTo: '/language', pathMatch: 'full' },
];

export default routeConfig;
