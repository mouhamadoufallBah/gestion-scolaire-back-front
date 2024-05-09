import { Pipe, PipeTransform } from '@angular/core';
import { Evaluation, Subject } from '../../utils/interfaces';

@Pipe({
  name: 'evaluation',
  standalone: true
})
export class EvaluationPipe implements PipeTransform {

  transform(evaluation_id: string, evaluations: Evaluation[], showDate: boolean = true, showType: boolean = true, showMatiere: boolean = true, showSemestre: boolean = true, matiere: Subject[]): string {
    const evaluation = evaluations.find(e => e.id == evaluation_id);
    if (evaluation) {
      let info = '';

      if (showDate) {
        info += evaluation.date;
      }

      if (showType) {
        info += (info ? ' - ' : '') + evaluation.type;
      }

      if (showMatiere) {
        let m: any =  matiere.find(elt => elt.id == evaluation.matiere_id)
        info += (info ? ' - ' : '') + m.nom;
      }

      if(showSemestre){
        info += (info ? ' - ' : '') + evaluation.semestre;
      }
      return info || 'N/A';
    } else {
      return 'N/A';
    }
  }

}
