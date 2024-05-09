import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../../core/services/generic-service/generic.service';
import { Classe, Student, Teacher } from '../../../core/utils/interfaces';
import { ClasseIdToClasseInfoPipe } from '../../../core/pipes/classe/classe-id-to-classe-info.pipe';

@Component({
  selector: 'app-overview-admin',
  standalone: true,
  imports: [CommonModule, ClasseIdToClasseInfoPipe],
  templateUrl: './overview-admin.component.html',
  styleUrl: './overview-admin.component.scss'
})
export class OverviewAdminComponent implements OnInit {

  public allClasses: Classe[] = [];
  public allTeachers: Teacher[] = [];
  public allStudents: Student[] = [];
  public LastFiveStudent: Student[] = [];
  public LastFiveTeacher: Teacher[] = [];


  ngOnInit(): void {
    this.onLoadAllClasse();
    this.onLoadAllStudent();
    this.onLoadAllTeacher();
    this.ongetLastFiveStudent();
    this.ongetLastFiveTeacher();
  }

  constructor(private service: GenericService) { }

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

  onLoadAllStudent() {
    this.service.getAll('apprenant').then(
      (res) => {
        this.allStudents = res[0].data[0];
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onLoadAllTeacher() {
    this.service.getAll('enseignant').then(
      (res) => {
        this.allTeachers = res[0].data[0];
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  ongetLastFiveStudent() {
    this.service.getAll('apprenant/getLastFive').then(
      (res) => {
        this.LastFiveStudent = res[0].data;
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  ongetLastFiveTeacher() {
    this.service.getAll('enseignant/getLastFive').then(
      (res) => {
        console.log(res);
        this.LastFiveTeacher = res[0].data;

      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }
}
