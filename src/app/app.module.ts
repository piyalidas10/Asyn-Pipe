import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import {ProductModule} from './product/product.module';
import { PushComponent } from './push/push.component';
import { AsyncComponent } from './push/async/async.component';
import { WithoutasyncComponent } from './push/withoutasync/withoutasync.component';

@NgModule({
  declarations: [
    AppComponent,
    PushComponent,
    AsyncComponent,
    WithoutasyncComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
