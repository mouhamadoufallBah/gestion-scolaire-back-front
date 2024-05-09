import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../../utils/interfaces';

@Pipe({
  name: 'roleIdToRoleName',
  standalone: true
})
export class RoleIdToRoleNamePipe implements PipeTransform {

  transform(role_id: string, roles: Role[]): string {
    const role = roles.find(r => r.id == role_id);
    return role ? role.nom : 'N/A';
  }

}
