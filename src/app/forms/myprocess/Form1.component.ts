import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CamundaRestService } from '../../camunda-rest.service';
import { CompleteTaskComponent } from '../general/complete-task.component';
import { StartNewProcess } from '../../schemas/MyProcessData';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'startTest',
  templateUrl: './Form1.component.html',
  styleUrls:[ './Form1.component.css'],
})
export class newForm  {
  submitted:boolean = false;
  model = new StartNewProcess('','','');
  constructor(public route: ActivatedRoute,
    public router: Router,
    public camundaRestService: CamundaRestService,
    public toastr: ToastrService) {
        
    
    this.route.params.subscribe((params:  any) => {
      const taskId = params['id'];
      const variableNames = Object.keys(this.model).join(',');
    //   this.loadExistingVariables(taskId, variableNames);
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      const taskId = params['id'];
      this.camundaRestService.postStartTaskComplete(taskId, this.model).subscribe();
      this.submitted = true;
      this.router.navigate(['/startNewProcess']);
      this.toastr.success('Created New Task', 'Success');
    });
  }
  }

