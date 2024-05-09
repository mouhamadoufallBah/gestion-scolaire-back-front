import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  userConnected: any;
  roles: any[] = [];

  sidebarItems = [
    { id: 1, title: "Tableau de bord", link: "./admin/overview", icon: "bi bi-grid", role_id: [1] },
    { id: 2, title: "Gestion des apprenants", link: "./admin/gestion-apprenant", icon: "bi bi-person", role_id: [1] },
    { id: 3, title: "Gestion des professeurs", link: "./admin/gestion-professeur", icon: "bi bi-person", role_id: [1] },
    { id: 4, title: "Gestion des classes", link: "./admin/gestion-classe", icon: "bi bi-menu-button-wide", role_id: [1] },
    { id: 5, title: "Gestion des matieres", link: "./admin/gestion-matiere", icon: "bi bi-menu-button-wide", role_id: [1] },
    { id: 6, title: "Tableau de bord", link: "./professeur/overview", icon: "bi bi-grid", role_id: [2] },
    { id: 7, title: "Gestion des Evaluations", link: "./professeur/evaluation", icon: "bi bi-grid", role_id: [2] },
    { id: 8, title: "Tableau de bord", link: "/apprenant/overview", icon: "bi bi-grid", role_id: [3] },

  ];

  ngOnInit(): void {
    this.userConnected = JSON.parse(localStorage.getItem('userConnected') || "null");
  }

  filteredSidebarItems(): any[] {
    if (this.userConnected) {
      // Utilisez la méthode filter pour filtrer les éléments du menu en fonction du rôle de l'utilisateur
      return this.sidebarItems.filter(item => item.role_id.includes(this.userConnected.role_id));
    } else {
      return [];
    }
  }
}
