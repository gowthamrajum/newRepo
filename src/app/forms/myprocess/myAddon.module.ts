import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { startNewProcessComponent } from './startNewProcess.component';
import { approveDataTaskComponent } from './approveDataTask.component';
import { RouterModule } from '@angular/router';
import { GenericForm } from 'src/app/generic-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { newForm } from './Form1.component';



@NgModule({
  entryComponents: [startNewProcessComponent,approveDataTaskComponent, newForm],
  declarations: [startNewProcessComponent,approveDataTaskComponent, newForm],
  imports: [FormsModule, RouterModule, BrowserModule],
  exports: [startNewProcessComponent,approveDataTaskComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class MyAddonModule {}

export { startNewProcessComponent } from './startNewProcess.component';
export { approveDataTaskComponent } from './approveDataTask.component';
