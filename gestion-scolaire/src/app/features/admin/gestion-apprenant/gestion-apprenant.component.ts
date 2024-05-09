import { Component, ElementRef, ViewChild } from '@angular/core';
import { Classe, Student } from '../../../core/utils/interfaces';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenericService } from '../../../core/services/generic-service/generic.service';
import { ClasseIdToClasseInfoPipe } from '../../../core/pipes/classe/classe-id-to-classe-info.pipe';

@Component({
  selector: 'app-gestion-apprenant',
  standalone: true,
  imports: [ReactiveFormsModule, ClasseIdToClasseInfoPipe],
  templateUrl: './gestion-apprenant.component.html',
  styleUrl: './gestion-apprenant.component.scss'
})
export class GestionApprenantComponent {
  public allStudents: Student[] = [];
  public allClasses: Classe[] = [];
  public student!: Student;
  public classesByIdStudent: any[] = [];
  public subjectByIdStudent: any[] = [];


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
    });

    this.updateForm = this.fb.group({
      nom: this.fb.control('', [Validators.required]),
      prenom: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      classe: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.onLoadAllStudents();
    this.onLoadAllClasse();

  }

  onLoadAllStudents() {
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

  onGetStudent(id: string) {
    this.service.getById('apprenant/get', id).then(
      (res) => {
        this.student = res[0].data;


        var parts = this.student.nomComplet.split(" ");

        // Récupérer le prénom (premier élément du tableau)
        let prenom = parts[0];
        let nom = parts[1];

        this.updateForm.patchValue({
          nom: nom,
          prenom: prenom,
          email: this.student.email,
          classe: this.student.classe_id,
        });
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onActiveDesactiveStudent(id: string) {
    this.service.update('apprenant/updateEtat', id, {}).then(
      (res) => {
        this.onLoadAllStudents();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );

  }

  onAddStudent() {
    const newStudentData = {
      nomComplet: this.addForm.get('prenom')?.value + " " + this.addForm.get('nom')?.value,
      email: this.addForm.get('email')?.value,
      password: "passer123",
      role_id: "2",
      classe_id: this.addForm.get('classe')?.value,
      etat: "Actif"
    }

    this.service.add('apprenant/add', newStudentData).then(
      (res) => {


        this.onLoadAllStudents();
        this.addForm.reset();
        this.closeAddExpenseModal.nativeElement.click();
      }
    ).catch(
      (err) => {
        console.log(err);

      }
    );
  }

  onUpdateStudent(id: string) {
    const newStudentData = {
      nomComplet: this.updateForm.get('prenom')?.value + " " + this.updateForm.get('nom')?.value,
      email: this.updateForm.get('email')?.value,
      password: this.student.password,
      role_id: this.student.role_id,
      classe_id: this.updateForm.get('classe')?.value,
      etat: this.student.etat
    }

    this.service.update('apprenant/update', id, newStudentData).then(
      (res) => {
        this.closeAddExpenseModalUpdate.nativeElement.click();
        this.onLoadAllStudents();
      }
    ).catch(
      (err) => {
        console.log(err);

      }
    )
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

  ondDeleteStudent(id: string) {
    this.service.delete('apprenant/delete', id).then(
      (res) => {
        this.onLoadAllStudents();
      }
    ).catch(
      err => console.log(err)
    );
  }
}
