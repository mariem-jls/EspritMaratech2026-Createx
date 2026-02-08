import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm = '';
  selectedRole = 'all';
  showActiveOnly = false;
  
  // Propriété pour le template
  roles = ['Admin', 'Coorporater', 'Bénévole', 'Donateur'];

  ngOnInit(): void {
    this.loadMockUsers();
  }

  loadMockUsers(): void {
    this.users = [
      {
        id: '1',
        firstName: 'Mohamed',
        lastName: 'Ben Ali',
        fullName: 'Mohamed Ben Ali',
        email: 'mohamed.benali@esprit.tn',
        phone: '+216 22 123 456',
        role: 'Admin',
        active: true,
        city: 'Tunis',
        familyId: 'FAM001',
        createdAt: '2024-01-15',
        lastLogin: '2024-02-08',
        status: 'Actif'
      },
      {
        id: '2',
        firstName: 'Fatima',
        lastName: 'Trabelsi',
        fullName: 'Fatima Trabelsi',
        email: 'fatima.trabelsi@esprit.tn',
        phone: '+216 50 987 654',
        role: 'Coorporater',
        active: true,
        city: 'Sousse',
        familyId: 'FAM002',
        createdAt: '2024-01-20',
        lastLogin: '2024-02-07',
        status: 'Actif'
      },
      {
        id: '3',
        firstName: 'Ahmed',
        lastName: 'Said',
        fullName: 'Ahmed Said',
        email: 'ahmed.said@esprit.tn',
        phone: '+216 98 456 123',
        role: 'V',
        active: true,
        city: 'Sfax',
        familyId: 'FAM003',
        createdAt: '2024-01-25',
        lastLogin: '2024-02-06',
        status: 'Actif'
      },
      {
        id: '4',
        firstName: 'Leila',
        lastName: 'Hammami',
        fullName: 'Leila Hammami',
        email: 'leila.hammami@esprit.tn',
        phone: '+216 55 789 012',
        role: 'Coorporeter',
        active: false,
        city: 'Nabeul',
        familyId: 'FAM004',
        createdAt: '2024-01-30',
        lastLogin: '2024-01-15',
        status: 'Inactif'
      },
      {
        id: '5',
        firstName: 'Khalil',
        lastName: 'Jabri',
        fullName: 'Khalil Jabri',
        email: 'khalil.jabri@esprit.tn',
        phone: '+216 70 321 654',
        role: 'Volunteer',
        active: true,
        city: 'Bizerte',
        familyId: 'FAM005',
        createdAt: '2024-02-01',
        lastLogin: '2024-02-05',
        status: 'Actif'
      },
      {
        id: '6',
        firstName: 'Samira',
        lastName: 'Mellouli',
        fullName: 'Samira Mellouli',
        email: 'samira.mellouli@esprit.tn',
        phone: '+216 52 147 258',
        role: 'Volunteer',
        active: true,
        city: 'Mahdia',
        familyId: 'FAM006',
        createdAt: '2024-02-02',
        lastLogin: '2024-02-08',
        status: 'Actif'
      },
      {
        id: '7',
        firstName: 'Youssef',
        lastName: 'Gharbi',
        fullName: 'Youssef Gharbi',
        email: 'youssef.gharbi@esprit.tn',
        phone: '+216 96 369 258',
        role: 'Coorporater',
        active: true,
        city: 'Gabès',
        familyId: 'FAM007',
        createdAt: '2024-02-03',
        lastLogin: '2024-02-07',
        status: 'Actif'
      },
      {
        id: '8',
        firstName: 'Amina',
        lastName: 'Bouzid',
        fullName: 'Amina Bouzid',
        email: 'amina.bouzid@esprit.tn',
        phone: '+216 54 987 321',
        role: 'Admin',
        active: false,
        city: 'Kairouan',
        familyId: 'FAM008',
        createdAt: '2024-02-04',
        lastLogin: '2024-01-20',
        status: 'Inactif'
      },
      {
        id: '9',
        firstName: 'Riadh',
        lastName: 'Chaabane',
        fullName: 'Riadh Chaabane',
        email: 'riadh.chaabane@esprit.tn',
        phone: '+216 25 741 852',
        role: 'Volunteer',
        active: true,
        city: 'Monastir',
        familyId: 'FAM009',
        createdAt: '2024-02-05',
        lastLogin: '2024-02-06',
        status: 'Actif'
      },
      {
        id: '10',
        firstName: 'Salma',
        lastName: 'Abidi',
        fullName: 'Salma Abidi',
        email: 'salma.abidi@esprit.tn',
        phone: '+216 27 963 852',
        role: 'Volunteer',
        active: true,
        city: 'Zaghouan',
        familyId: 'FAM010',
        createdAt: '2024-02-06',
        lastLogin: '2024-02-08',
        status: 'Actif'
      },
      {
        id: '11',
        firstName: 'Hichem',
        lastName: 'Fersi',
        fullName: 'Hichem Fersi',
        email: 'hichem.fersi@esprit.tn',
        phone: '+216 99 456 789',
        role: 'Admin',
        active: false,
        city: 'Jendouba',
        familyId: 'FAM011',
        createdAt: '2024-02-07',
        lastLogin: '2024-01-25',
        status: 'Inactif'
      },
      {
        id: '12',
        firstName: 'Noura',
        lastName: 'Chakroun',
        fullName: 'Noura Chakroun',
        email: 'noura.chakroun@esprit.tn',
        phone: '+216 20 159 753',
        role: 'Admin',
        active: true,
        city: 'Tataouine',
        familyId: 'FAM012',
        createdAt: '2024-02-08',
        lastLogin: '2024-02-08',
        status: 'Actif'
      }
    ];
    this.filteredUsers = [...this.users];
  }

  applyFilters(): void {
    let result = [...this.users];
    
    if (this.selectedRole !== 'all') {
      result = result.filter(user => user.role === this.selectedRole);
    }
    
    if (this.showActiveOnly) {
      result = result.filter(user => user.active);
    }
    
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(user => 
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.fullName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        (user.phone && user.phone.toLowerCase().includes(term)) ||
        (user.city && user.city.toLowerCase().includes(term))
      );
    }
    
    this.filteredUsers = result;
  }

  getRoleBadgeClass(role: string): string {
    switch (role) {
      case 'Admin': return 'bg-danger';
      case 'Volunteer': return 'bg-warning text-dark';
      case 'Coorporater': return 'bg-success';
      case 'Donateur': return 'bg-info';
      default: return 'bg-secondary';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Actif': return 'bg-success';
      case 'Inactif': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  toggleUserStatus(user: any): void {
    user.active = !user.active;
    user.status = user.active ? 'Actif' : 'Inactif';
    this.applyFilters();
  }

  deleteUser(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.users = this.users.filter(user => user.id !== id);
      this.applyFilters();
      alert('Utilisateur supprimé avec succès !');
    }
  }

  // Méthode pour obtenir l'initiale du prénom
  getInitial(firstName: string): string {
    return firstName ? firstName.charAt(0).toUpperCase() : '?';
  }

  // Méthode pour obtenir la date formatée
  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-TN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  // Méthode pour réinitialiser les filtres
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedRole = 'all';
    this.showActiveOnly = false;
    this.applyFilters();
  }

  // Méthode pour obtenir le nombre d'utilisateurs par rôle
  getUsersCountByRole(role: string): number {
    return this.users.filter(user => user.role === role).length;
  }

  // Méthode pour obtenir le nombre d'utilisateurs actifs
  getActiveUsersCount(): number {
    return this.users.filter(user => user.active).length;
  }
}