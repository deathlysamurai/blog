import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Move } from '../../models/move.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  private readonly API_ROUTES = {
    addMove: '/move',
    deleteMove: (moveId: string) => `/move/${moveId}`,
    getMove: (moveId: string) => `/move/${moveId}`,
    getMoves: '/move',
    updateMove: (moveId: string) => `/move/${moveId}`
  }
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public addMove(move: Move) {
    return this.http.post(this.baseUrl + this.API_ROUTES.addMove, move);
  }

  public deleteMove(move: Move) {
    return this.http.delete(this.baseUrl + this.API_ROUTES.deleteMove(move.id));
  }

  public getMove(move: Move) {
    return this.http.get(this.baseUrl + this.API_ROUTES.getMove(move.id));
  }

  public getMoves() {
    return this.http.get(this.baseUrl + this.API_ROUTES.getMoves);
  }

  public updateMove(move: Move) {
    return this.http.put(this.baseUrl + this.API_ROUTES.updateMove(move.id), move);
  }
}
