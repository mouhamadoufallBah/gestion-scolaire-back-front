import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../core/services/generic-service/generic.service';
import { Classe, Evaluation, Subject, Teacher } from '../../../core/utils/interfaces';
import { MatiereIdToMatiereInfoPipe } from '../../../core/pipes/matiere/matiere-id-to-matiere-info.pipe';
import { ClasseIdToClasseInfoPipe } from '../../../core/pipes/classe/classe-id-to-classe-info.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-overview-teacher',
  standalone: true,
  imports: [CommonModule,ClasseIdToClasseInfoPipe, MatiereIdToMatiereInfoPipe],
  templateUrl: './overview-teacher.component.html',
  styleUrl: './overview-teacher.component.scss'
})
export class OverviewTeacherComponent implements OnInit{
  public allEvaluation: Evaluation[] = [];
  public allEvaluationEncour: Evaluation[] = [];
  public allEvaluationFait: Evaluation[] = [];
  public allEvaluationReporter: Evaluation[] = [];
  public userConnected!: Teacher;
  public allSubjects: Subject[] = [];
  public allClasses: Classe[] = [];

  constructor(private service: GenericService){}

  ngOnInit(): void {
    const userConnected = JSON.parse(localStorage.getItem('userConnected') || "null");
    this.getUserConected(userConnected.id);
    this.onLoadAllSubject();
    this.onLoadAllClasse();
  }

  getUserConected(id: number) {
    this.service.getById('enseignant/get', id).then(
      (res) => {
        this.userConnected = res[0].data
        this.onLoadEvaluations(this.userConnected.id);
      }
    ).catch(
      err => console.log(err)
    );
  }

  onLoadEvaluations(id: string) {
    this.service.getAll('evaluation').then(
      (res) => {
        this.allEvaluation = res[0].data[0].filter((elt: Evaluation) => elt.classe_id == this.userConnected.classe_id);
        this.allEvaluationEncour = this.allEvaluation.filter((elt: Evaluation) => elt.etat == "En cours");
        this.allEvaluationFait = this.allEvaluation.filter((elt: Evaluation) => elt.etat == "Fait");
        this.allEvaluationReporter = this.allEvaluation.filter((elt: Evaluation) => elt.etat == "Reporté");
      }
    ).catch(
      (err) => console.log(err)
    );
  }

  onLoadAllSubject() {
    this.service.getAll('matiere').then(
      (res) => {
        this.allSubjects = res[0].data[0];
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onLoadAllClasse() {
    this.service.getAll('classe').then(
      (res) => {
        this.allClasses = res[0].data;
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

}
