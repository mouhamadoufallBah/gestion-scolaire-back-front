import { Component, OnInit } from '@angular/core';
import { Role, Student, Teacher, User } from '../../core/utils/interfaces';
import { RoleIdToRoleNamePipe } from '../../core/pipes/role/role-id-to-role-name.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RoleIdToRoleNamePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public userOnline!: Teacher | Student | User;
  public roles: Role[] = [
    {
      id: "1",
      nom: "Admin"
    },
    {
      id: "2",
      nom: "Enseignant"
    },
    {
      id: "3",
      nom: "Apprenant"
    },
  ];

  constructor(private route: Router){}

  ngOnInit(): void {
    this.userOnline = JSON.parse(localStorage.getItem('userConnected') || '');
  }

  logout() {
    localStorage.removeItem('token');
    this.route.navigate(['/']);
  }

}
