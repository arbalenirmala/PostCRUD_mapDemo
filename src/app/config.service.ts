import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private httpClient: HttpClient) { }

  public getList(){
    return this.httpClient.get('http://localhost:3000/api/v1/posts');
  }

  public getImage(id:any){
    return this.httpClient.get('http://localhost:3000/api/v1/posts/'+id);
  }

  public createNew(newEntry:any){
    return this.httpClient.post('http://localhost:3000/api/v1/posts',newEntry);
  }

  public updateReq(updateRecord:any,id:any){
        return this.httpClient.put('http://localhost:3000/api/v1/posts/'+id ,updateRecord);
  }

   public deleteReq(id:any){
      return this.httpClient.delete('http://localhost:3000/api/v1/posts/'+id);
    }
}
