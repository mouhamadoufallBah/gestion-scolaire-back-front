import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from '../../utils/interfaces';

@Pipe({
  name: 'matiereIdToMatiereInfo',
  standalone: true
})
export class MatiereIdToMatiereInfoPipe implements PipeTransform {

  transform(matiere_id: string, matieres: Subject[]): string {
    const matiere = matieres.find(p => p.id === matiere_id);
    return matiere ? matiere.nom : 'N/A';
  }

}
