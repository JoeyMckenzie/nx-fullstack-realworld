import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontendUsersRoutingModule } from './frontend-users-routing.module';

import * as fromState from './+state';
import { UsersService } from './services/users.service';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FrontendUsersRoutingModule,
    StoreModule.forFeature(fromState.USERS_FEATURE_KEY, fromState.reducer),
    EffectsModule.forFeature([fromState.UsersEffects]),
  ],
  providers: [fromState.UsersFacade, UsersService, LocalStorageService],
  declarations: [RegisterComponent, LoginComponent],
})
export class FrontendUsersModule {}
