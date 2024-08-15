import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ComputerVisionComponent } from './computer-vision/computer-vision.component';

const routeConfig: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  {
    path: 'vision',
    component: ComputerVisionComponent,
    title: 'Computer Vision Capabilities',
  },
  //TODO: Make home default path once done testing with vision
  { path: '', redirectTo: '/vision', pathMatch: 'full' },
];

export default routeConfig;
