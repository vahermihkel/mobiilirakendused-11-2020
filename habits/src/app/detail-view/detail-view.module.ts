import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgGitCalendarModule } from '../../lib/ng-git-calendar.module';


import { DetailViewPageRoutingModule } from './detail-view-routing.module';

import { DetailViewPage } from './detail-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailViewPageRoutingModule,
    NgGitCalendarModule
  ],
  declarations: [DetailViewPage]
})
export class DetailViewPageModule {}
