import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoveResponse } from '../../models/responses/moveResponse.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  private readonly API_ROUTES = {
    addMove: '/moves',
    deleteMove: (moveId: string) => `/moves/${moveId}`,
    getMove: (moveId: string) => `/moves/${moveId}`,
    getMoves: '/moves',
    updateMove: (moveId: string) => `/moves/${moveId}`
  }
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // public addMove(move: Move) {
  //   return this.http.post(this.baseUrl + this.API_ROUTES.addMove, move);
  // }

  // public deleteMove(move: Move) {
  //   return this.http.delete(this.baseUrl + this.API_ROUTES.deleteMove(move.id));
  // }

  // public getMove(move: Move) {
  //   return this.http.get(this.baseUrl + this.API_ROUTES.getMove(move.id));
  // }

  public getMoves(): Observable<MoveResponse> {
    return this.http.get<MoveResponse>(this.baseUrl + this.API_ROUTES.getMoves);
  }

  // public updateMove(move: Move) {
  //   return this.http.put(this.baseUrl + this.API_ROUTES.updateMove(move.id), move);
  // }
}
