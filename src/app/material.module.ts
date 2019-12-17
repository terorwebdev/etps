import { NgModule } from '@angular/core';

import { MatButtonModule, MatToolbarModule } from '@angular/material';
import {
    MatSelectModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatListModule
} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
    imports: [
        MatExpansionModule,
        NgxMatSelectSearchModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatDatepickerModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatRadioModule,],

    exports: [
        MatExpansionModule,
        NgxMatSelectSearchModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatNativeDateModule,
        MatSidenavModule,
        FormsModule,
        MatDatepickerModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatRadioModule,],

})

export class MyMaterialModule { }