import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GenericService } from '../../../core/services/generic-service/generic.service';
import { classeRoute, classeTeacherRoute, matiereRoute, matiereUserRoute, userRoute } from '../../../core/utils/constante';
import { Classe, Subject, Teacher, User } from '../../../core/utils/interfaces';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClasseIdToClasseInfoPipe } from '../../../core/pipes/classe/classe-id-to-classe-info.pipe';
import { MatiereIdToMatiereInfoPipe } from '../../../core/pipes/matiere/matiere-id-to-matiere-info.pipe';

@Component({
  selector: 'app-gestion-professeur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClasseIdToClasseInfoPipe, MatiereIdToMatiereInfoPipe],
  templateUrl: './gestion-professeur.component.html',
  styleUrl: './gestion-professeur.component.scss'
})
export class GestionProfesseurComponent implements OnInit {
  public allTeachers: Teacher[] = [];
  public allSubjects: Subject[] = [];
  public allClasses: Classe[] = [];
  public teacher!: Teacher;
  public classesByIdTeacher: any[] = [];
  public subjectByIdTeacher: any[] = [];


  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef;
  @ViewChild('closeAddExpenseModalUpdate') closeAddExpenseModalUpdate!: ElementRef;

  public addForm!: FormGroup
  public updateForm!: FormGroup


  constructor(private service: GenericService, private fb: FormBuilder) {
    this.addForm = this.fb.group({
      nom: this.fb.control('', [Validators.required]),
      prenom: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      classe: this.fb.control('', [Validators.required]),
      subject: this.fb.control('', [Validators.required]),
    });

    this.updateForm = this.fb.group({
      nom: this.fb.control('', [Validators.required]),
      prenom: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      classe: this.fb.control('', [Validators.required]),
      subject: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.onLoadAllTeachers();
    this.onLoadAllSubject();
    this.onLoadAllClasse();

  }

  onLoadAllTeachers() {
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

  onGetTeacher(id: string) {
    this.service.getById('enseignant/get', id).then(
      (res) => {
        this.teacher = res[0].data;


        var parts = this.teacher.nomComplet.split(" ");

        // Récupérer le prénom (premier élément du tableau)
        let prenom = parts[0];
        let nom = parts[1];

        this.updateForm.patchValue({
          nom: nom,
          prenom: prenom,
          email: this.teacher.email,
          classe: this.teacher.classe_id,
          subject: this.teacher.matiere_id
        });
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onActiveDesactiveTeacher(id: string) {
    this.service.update('enseignant/updateEtat', id, {}).then(
      (res) => {
        this.onLoadAllTeachers();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );

  }

  onAddTeacher() {
    const newTeacherData = {
      nomComplet: this.addForm.get('prenom')?.value + " " + this.addForm.get('nom')?.value,
      email: this.addForm.get('email')?.value,
      password: "passer123",
      role_id: "2",
      matiere_id: this.addForm.get('subject')?.value,
      classe_id: this.addForm.get('classe')?.value,
      etat: "Actif"
    }

    this.service.add('enseignant/add', newTeacherData).then(
      (res) => {
        this.onLoadAllTeachers();
        this.addForm.reset();
        this.closeAddExpenseModal.nativeElement.click();
      }
    ).catch(
      (err) => {
        console.log(err);

      }
    );
  }

  onUpdateTeacher(id: string) {
    const newTeacherData = {
      nomComplet: this.updateForm.get('prenom')?.value + " " + this.updateForm.get('nom')?.value,
      email: this.updateForm.get('email')?.value,
      password: this.teacher.password,
      role_id: this.teacher.role_id,
      matiere_id: this.updateForm.get('subject')?.value,
      classe_id: this.updateForm.get('classe')?.value,
      etat: this.teacher.etat
    }

    console.log(newTeacherData);

    this.service.update('enseignant/update', id, newTeacherData).then(
      (res) => {
        this.closeAddExpenseModalUpdate.nativeElement.click();
        this.onLoadAllTeachers();
      }
    ).catch(
      (err) => {
        console.log(err);

      }
    )
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

  ondDeleteTeacher(id: string) {
    this.service.delete('enseignant/delete', id).then(
      (res) => {
        this.onLoadAllTeachers();
      }
    ).catch(
      err => console.log(err)
    );
  }

}
