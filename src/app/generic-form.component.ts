import { Component, OnInit,
  ViewChild, ViewContainerRef,
  ComponentFactoryResolver,
  OnChanges, SimpleChange, Input } from '@angular/core';

import { TasklistComponent } from './tasklist/tasklist.component';
import * as MyAddon from './forms/myprocess/myAddon.module';

@Component({
  selector: 'generic-form',
  templateUrl: './generic-form.component.html',
  styleUrls: []
})
export class GenericForm implements OnChanges {
  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef

  @Input() public formKey:String = '';
  @Input() public taskId:String = '';
  private rootViewContainer = null;
  private myAddonModule = null;

  constructor(private factoryResolver: ComponentFactoryResolver) {

  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      if (propName === 'formKey' && changes[propName].currentValue != null) {
        this.loadForm(changes[propName].currentValue);
      }
    }
  }

  loadForm(formKey: String): void {
    this.setRootViewContainerRef(this.viewContainerRef);
    this.addDynamicComponent(formKey);
  }
  // @ts-ignore
  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  public addDynamicComponent(formKey: String) {
    console.log(MyAddon)
    console.log(formKey)
    let factory
    if(formKey === 'embedded:app:forms/start-form.html'){
      // @ts-ignore
     factory = this.factoryResolver.resolveComponentFactory(MyAddon['approveDataTask'+'Component'])
    }else{
      // @ts-ignore
     factory = this.factoryResolver.resolveComponentFactory(MyAddon['approveDataTask'+'Component'])
    }
    
    // @ts-ignore
    const component = factory.create(this.rootViewContainer.parentInjector)
    
    // @ts-ignore
    this.rootViewContainer.insert(component.hostView)
  }
}
