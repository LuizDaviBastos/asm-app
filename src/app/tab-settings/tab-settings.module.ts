import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabSettingsPage } from './tab-settings.page';
import { Tab3PageRoutingModule } from './tab-settings-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TabSettingsPage }]),
    Tab3PageRoutingModule,
  ],
  declarations: [TabSettingsPage]
})
export class Tab3PageModule {}
