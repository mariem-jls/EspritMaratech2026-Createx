import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AidType, AidTypeCreateDto, AidTypeUpdateDto, AidCategory } from '../models/aid-types.model';

@Injectable({
  providedIn: 'root' // Ou 'AidTypesModule' si tu veux le limiter au module
})
export class AidTypeService {
  private apiUrl = 'http://localhost:8081/api/aid-types'; // À adapter

  constructor(private http: HttpClient) {}

  // Récupérer tous les types d'aide
  getAll(): Observable<AidType[]> {
    return this.http.get<AidType[]>(this.apiUrl);
  }

  // Récupérer par ID
  getById(id: string): Observable<AidType> {
    return this.http.get<AidType>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouveau type d'aide
  create(aidType: AidTypeCreateDto): Observable<AidType> {
    return this.http.post<AidType>(this.apiUrl, aidType);
  }

  // Mettre à jour
  update(id: string, aidType: AidTypeUpdateDto): Observable<AidType> {
    return this.http.put<AidType>(`${this.apiUrl}/${id}`, aidType);
  }

  // Supprimer
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer seulement les actifs (pour les formulaires)
  getActive(): Observable<AidType[]> {
    return this.http.get<AidType[]>(`${this.apiUrl}/active`);
  }

  // Rechercher par catégorie
  getByCategory(category: AidCategory): Observable<AidType[]> {
    return this.http.get<AidType[]>(`${this.apiUrl}/category/${category}`);
  }
}