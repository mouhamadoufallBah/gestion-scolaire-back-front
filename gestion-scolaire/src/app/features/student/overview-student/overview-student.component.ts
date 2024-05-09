import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../core/services/generic-service/generic.service';
import { Evaluation, Teacher, Classe, Subject } from '../../../core/utils/interfaces';
import { EvaluationPipe } from '../../../core/pipes/evaluation/evaluation.pipe';

@Component({
  selector: 'app-overview-student',
  standalone: true,
  imports: [EvaluationPipe],
  templateUrl: './overview-student.component.html',
  styleUrl: './overview-student.component.scss'
})
export class OverviewStudentComponent implements OnInit {
  public allEvaluation: Evaluation[] = [];
  public allEvaluationEncour: Evaluation[] = [];
  public allEvaluationFait: Evaluation[] = [];
  public allEvaluationReporter: Evaluation[] = [];
  public userConnected!: Teacher;
  public allSubjects: Subject[] = [];
  public allClasses: Classe[] = [];
  public allNote: any[] = [];

  constructor(private service: GenericService){}
  ngOnInit(): void {
    const userConnected = JSON.parse(localStorage.getItem('userConnected') || "null");
    this.getUserConected(userConnected.id);
    this.onLoadAllSubject();
    this.onLoadAllClasse();
    this.onLoadEvaluations();
  }

  getUserConected(id: number) {
    this.service.getById('apprenant/get', id).then(
      (res) => {
        this.userConnected = res[0].data
        this.onLoadNote(this.userConnected.id);
      }
    ).catch(
      err => console.log(err)
    );
  }

  onLoadNote(id: string) {
    this.service.getAll('note').then(
      (res) => {
        this.allNote = res[0].data.filter((elt: any) => elt.id_apprenant == this.userConnected.id);
      }
    ).catch(
      (err) => console.log(err)
    );
  }

  onLoadEvaluations() {
    this.service.getAll('evaluation').then(
      (res) => {
        this.allEvaluation = res[0].data[0];
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
