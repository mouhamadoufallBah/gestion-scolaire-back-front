import { Pipe, PipeTransform } from '@angular/core';
import { Classe } from '../../utils/interfaces';

@Pipe({
  name: 'classeIdToClasseInfo',
  standalone: true
})
export class ClasseIdToClasseInfoPipe implements PipeTransform {

  transform(classe_id: string, classes: Classe[]): string {
    const classe = classes.find(p => p.id === classe_id);
    return classe ? classe.nom : 'N/A';
  }

}
