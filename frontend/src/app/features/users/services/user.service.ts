import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../components/user-form/user-form.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Remplacez par votre URL API
  
  // Configuration par défaut si l'API n'est pas disponible
  private useMockData = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    if (this.useMockData) {
      return of(this.getMockUsers());
    }
    
    return this.http.get<User[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  // Récupérer un utilisateur par ID
  getUserById(id: number): Observable<User> {
    if (this.useMockData) {
      const user = this.getMockUsers().find(u => u.id === id);
      return user 
        ? of(user) 
        : new Observable(observer => {
            observer.error('Utilisateur non trouvé');
          });
    }
    
    return this.http.get<User>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError<User>('getUserById'))
      );
  }

  // Créer un nouvel utilisateur
  createUser(user: User): Observable<User> {
    if (this.useMockData) {
      const newUser = {
        ...user,
        id: Math.floor(Math.random() * 1000) + 100
      };
      return of(newUser);
    }
    
    return this.http.post<User>(this.apiUrl, user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('createUser'))
      );
  }

  // Mettre à jour un utilisateur
  updateUser(id: number, user: User): Observable<User> {
    if (this.useMockData) {
      return of({ ...user, id });
    }
    
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('updateUser'))
      );
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    if (this.useMockData) {
      return of({ success: true });
    }
    
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteUser'))
      );
  }

  // Données mockées pour le développement
  private getMockUsers(): User[] {
    return [
      { 
        id: 1, 
        name: 'John Doe', 
        email: 'john@example.com', 
        phone: '+1234567890', 
        role: 'ADMIN', 
        status: 'ACTIVE',
        address: '123 Main St, New York, NY 10001',
        familyId: 101,
        notes: 'Super administrateur avec tous les droits'
      },
      { 
        id: 2, 
        name: 'Jane Smith', 
        email: 'jane@example.com', 
        phone: '+0987654321', 
        role: 'VOLUNTEER', 
        status: 'INACTIVE',
        address: '456 Oak Ave, Los Angeles, CA 90001',
        familyId: 102,
        notes: 'Bénévole depuis 2 ans'
      },
      { 
        id: 3, 
        name: 'Bob Wilson', 
        email: 'bob@example.com', 
        phone: '+33612345678', 
        role: 'COORPORATE', 
        status: 'ACTIVE',
        address: '789 Pine Rd, Chicago, IL 60007',
        familyId: 103,
        notes: 'Gère une équipe de 5 bénévoles'
      }
    ];
  }

  // Gestion des erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      
      // Retourner un résultat par défaut
      return of(result as T);
    };
  }
}