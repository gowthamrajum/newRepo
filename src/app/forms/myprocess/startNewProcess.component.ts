import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CamundaRestService } from '../../camunda-rest.service';
import { StartProcessInstanceComponent } from '../general/start-process-instance.component'
import { MyProcessData } from '../../schemas/MyProcessData';

@Component({
  selector: 'startNewProcess',
  templateUrl: './startNewProcess.component.html',
  styleUrls: ['./startNewProcess.component.css']
})
export class startNewProcessComponent extends StartProcessInstanceComponent {
  submitted:boolean = false;
  model = new MyProcessData('','',false,'');
  startProcesstasks: any;
  formKey: String= '';
  taskId: any;

  constructor(route: ActivatedRoute,
    camundaRestService: CamundaRestService,) {
    super(route, camundaRestService);
  }
  ngOnInit() {
    this.getStartProcessTasks()
    if (this.route.params != null) {
      this.route.params.subscribe((params: any) => {
        if (params['id'] != null) {
          this.taskId = params['id'];
          // this.getStartProcessFormKey();
        } else {
          this.getStartProcessTasks();
        }
      });
    }
  }
  getStartProcessFormKey(): void {
    this.camundaRestService
      .getStartProcesTaskFormKey(this.taskId)
      .subscribe((formKey:any) => this.formKey = formKey.key);
  }
  getStartProcessTasks(): void {
    this.camundaRestService
      .getStartProcessTasks()
      .subscribe((tasks: any) => {
        this.startProcesstasks = tasks
        console.log(this.startProcesstasks)
      }
      );
      
  }
}
