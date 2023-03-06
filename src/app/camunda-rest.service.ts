import { from, Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessDefinition } from './schemas/ProcessDefinition';
import { Task } from './schemas/Task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CamundaRestService {
  private engineRestUrl = 'http://localhost:8080/engine-rest/'
  private startProcess = 'http://localhost:8080/engine-rest/process-definition/key/TestProcess/start'
  // http://localhost:8080/camunda/api/engine/engine/default/task/98939519-b649-11ed-bff8-5e5f67d05e26

  constructor(private http: HttpClient) {

  }

  getStartProcessTasks(): Observable<Task[]> {
    const endpoint = this.engineRestUrl +'process-definition?' + 'latest=true&active=true&startableInTasklist=true&startablePermissionCheck=true&firstResult=0&maxResults=15'
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getStartProcessTasks', []))
    );
  }

  
  getStartProcesTaskFormKey(taskId: String): Observable<any> {
    const endpoint =  this.engineRestUrl +'task/'+ taskId +'/form';
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched taskform`)),
      catchError(this.handleError('getTaskFormKey', []))
    );
  }

  getTasks(): Observable<Task[]> {
    const endpoint = `${this.engineRestUrl}task?sortBy=created&sortOrder=desc&maxResults=10`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks`)),
      catchError(this.handleError('getTasks', []))
    );
  }

  getTaskFormKey(taskId: String): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/form`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched taskform`)),
      catchError(this.handleError('getTaskFormKey', []))
    );
  }

  getVariablesForTask(taskId: String, variableNames: String): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/form-variables?variableNames=${variableNames}`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched variables`)),
      catchError(this.handleError('getVariablesForTask', []))
    );
  }

  postCompleteTask(taskId: String, variables: Object): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/complete`;
    return this.http.post<any>(endpoint, variables).pipe(
      tap(tasks => this.log(`posted complete task`)),
      catchError(this.handleError('postCompleteTask', []))
    );
  }

  postStartTaskComplete(taskId: String, variables: Object): Observable<any> {
    const endpoint = `${this.engineRestUrl}process-definition/key/${taskId}/start`;
    return this.http.post<any>(endpoint, variables).pipe(
      tap(tasks => this.log(`posted complete task`))
      // catchError(this.handleError('postCompleteTask', []))
    );
  }

  getProcessDefinitionTaskKey(processDefinitionKey: any): Observable<any> {
    const url = `${this.engineRestUrl}process-definition/key/${processDefinitionKey}/startForm`;
    return this.http.get<any>(url).pipe(
      tap(form => this.log(`fetched formkey`)),
      catchError(this.handleError('getProcessDeifnitionFormKey', []))
    );
  }

  getProcessDefinitions(): Observable<ProcessDefinition[]> {
    return this.http.get<ProcessDefinition[]>(this.engineRestUrl + 'process-definition?latestVersion=true').pipe(
      tap(processDefinitions => this.log(`fetched processDefinitions`)),
      catchError(this.handleError('getProcessDefinitions', []))
    );
  }

  postProcessInstance(processDefinitionKey: any, variables: { variables: {}; }): Observable<any> {
    const endpoint = `${this.engineRestUrl}process-definition/key/${processDefinitionKey}/start`;
    return this.http.post<any>(endpoint, variables).pipe(
      tap(processDefinitions => this.log(`posted process instance`)),
      catchError(this.handleError('postProcessInstance', []))
    );
  }

  deployProcess(fileToUpload: File): Observable<any> {
    const endpoint = `${this.engineRestUrl}deployment/create`;
    const formData = new FormData();

    formData.append('fileKey', fileToUpload, fileToUpload.name);

    return this.http.post(endpoint, formData);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}

