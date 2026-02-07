import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

// Interface pour le modèle d'utilisateur
export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  address?: string;
  familyId?: number;
  notes?: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserFormComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();
  
  isEditMode = false;
  formUser: User = {
    name: '',
    email: '',
    phone: '',
    role: 'VOLUNTEER',
    status: 'ACTIVE',
    address: '',
    familyId: undefined,
    notes: ''
  };
  
  roles = [
    { value: 'ADMIN', label: 'Administrateur' },
    { value: 'COORPORATE', label: 'Manager' },
    { value: 'VOLUNTEER', label: 'Bénévole' }
  ];
  
  statuses = [
    { value: 'ACTIVE', label: 'Actif' },
    { value: 'INACTIVE', label: 'Inactif' },
    { value: 'PENDING', label: 'En attente' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Vérifier si on est en mode édition (via l'URL)
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.loadUserForEdit(+id);
      }
    });

    // Si un utilisateur est passé en input (pour réutilisation)
    if (this.user) {
      this.isEditMode = true;
      this.formUser = { ...this.user };
    }
  }

  loadUserForEdit(id: number): void {
    // Simuler le chargement d'un utilisateur
    // En réalité, vous feriez une requête HTTP
    const mockUsers: User[] = [
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
        role: 'MANAGER', 
        status: 'ACTIVE',
        address: '789 Pine Rd, Chicago, IL 60007',
        familyId: 103,
        notes: 'Gère une équipe de 5 bénévoles'
      }
    ];
    
    const userToEdit = mockUsers.find(user => user.id === id);
    if (userToEdit) {
      this.formUser = { ...userToEdit };
    } else {
      // Rediriger si l'utilisateur n'est pas trouvé
      this.router.navigate(['/users']);
    }
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.save.emit(this.formUser);
      
      // Pour la démo, simuler une sauvegarde réussie
      alert(`Utilisateur ${this.isEditMode ? 'modifié' : 'créé'} avec succès !`);
      this.goBack();
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

  isFormValid(): boolean {
    return !!this.formUser.name && 
           !!this.formUser.email && 
           !!this.formUser.phone && 
           !!this.formUser.role;
  }

  // Méthodes pour générer les classes de validation
  getFieldClass(fieldValue: string | undefined): string {
    if (!fieldValue) return 'invalid';
    return 'valid';
  }
}