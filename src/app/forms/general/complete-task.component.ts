import { CamundaRestService } from '../../camunda-rest.service';
import { ActivatedRoute, Router } from '@angular/router';

export class CompleteTaskComponent {
  model: any;
  submitted: boolean = false
  route: ActivatedRoute
  router: Router
  camundaRestService: CamundaRestService

  constructor(route: ActivatedRoute,
    router: Router,
    camundaRestService: CamundaRestService,
    ) {
      this.route = route;
      this.router = router;
      this.camundaRestService = camundaRestService;
  }
  onSubmit() {
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      const taskId = params['id'];
      const variables = this.generateVariablesFromFormFields();
      this.camundaRestService.postCompleteTask(taskId, variables).subscribe();
      this.submitted = true;
      this.router.navigate(['/tasklist']);
    });
  }
  loadExistingVariables(taskId: String, variableNames: String) {
    this.camundaRestService.getVariablesForTask(taskId, variableNames).subscribe((result:any) => {
      this.generateModelFromVariables(result);
    });
  }
  generateModelFromVariables(variables:any) {
    Object.keys(variables).forEach((variableName) => {
      this.model[variableName] = variables[variableName].value;
    });
  }
  generateVariablesFromFormFields() {
    const variables = {
      variables: Object()
    };
    Object.keys(this.model).forEach((field) => {
      variables.variables[field] = {
        value: this.model[field]
      };
    });

    return variables;
  }
}
