import { NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule } from '@angular/material';
import { MatCheckboxModule, MatDatepickerModule, MatCardModule } from '@angular/material';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';


@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
         MatNativeDateModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule],
    exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
        MatNativeDateModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatListModule,  MatTabsModule]
})

export class MaterialModule {}

