import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GenericService } from '../../../core/services/generic-service/generic.service';
import { Classe, Evaluation, Student, Subject, Teacher } from '../../../core/utils/interfaces';
import { CommonModule } from '@angular/common';
import { ClasseIdToClasseInfoPipe } from '../../../core/pipes/classe/classe-id-to-classe-info.pipe';
import { MatiereIdToMatiereInfoPipe } from '../../../core/pipes/matiere/matiere-id-to-matiere-info.pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotiflixService } from '../../../core/services/notiflix/notiflix.service';

@Component({
  selector: 'app-gestion-evaluation',
  standalone: true,
  imports: [CommonModule, ClasseIdToClasseInfoPipe, MatiereIdToMatiereInfoPipe, ReactiveFormsModule],
  templateUrl: './gestion-evaluation.component.html',
  styleUrl: './gestion-evaluation.component.scss'
})
export class GestionEvaluationComponent implements OnInit {
  public allEvaluation: Evaluation[] = [];
  public allSubjects: Subject[] = [];
  public allClasses: Classe[] = [];
  public userConnected!: Teacher;
  public evaluation!: Evaluation;
  //recuperer les etudiant d'une classe
  public studentByClasse: Student[] = [];

  //recuperer les nom lorsqu'on crée le formulaire de notation
  public studentsName: string[] = [];
   //recuperer les id lorsqu'on crée le formulaire de notation
  public studentsId: string[] = [];
   //recuperer les verifcation si l'etudiant à un note ou pas lorsqu'on crée le formulaire de notation
  public haveNote: boolean[] = [];

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef;
  @ViewChild('closeAddExpenseModalUpdate') closeAddExpenseModalUpdate!: ElementRef;

  public addForm!: FormGroup;
  public updateForm!: FormGroup;
  public addNoteForm!: FormGroup;
  public studentNoteForms: FormGroup[] = [];

  etat = [
    { id: 1, nom: "En cours" },
    { id: 2, nom: "Fait" },
    { id: 1, nom: "Reporté" }
  ]

  type = [
    { id: 1, nom: "Devoir" },
    { id: 2, nom: "Examen" }
  ]

  Semestre = [
    { id: 1, nom: "Semestre 1" },
    { id: 2, nom: "Semestre 2" }
  ]

  constructor(private service: GenericService, private fb: FormBuilder, private notiflix: NotiflixService) {
    this.addForm = this.fb.group({
      date: this.fb.control('', [Validators.required]),
      classe_id: this.fb.control('', [Validators.required]),
      matiere_id: this.fb.control('', [Validators.required]),
      enseignant_id: this.fb.control('', [Validators.required]),
      etat: this.fb.control('En cours', [Validators.required]),
      type: this.fb.control('', [Validators.required]),
      semestre: this.fb.control('', [Validators.required]),
    });

    this.updateForm = this.fb.group({
      date: this.fb.control('', [Validators.required]),
      classe_id: this.fb.control('', [Validators.required]),
      matiere_id: this.fb.control('', [Validators.required]),
      enseignant_id: this.fb.control('', [Validators.required]),
      etat: this.fb.control('', [Validators.required]),
      type: this.fb.control('', [Validators.required]),
      semestre: this.fb.control('', [Validators.required]),
    });
  }

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

        this.addForm.patchValue(
          {
            classe_id: this.userConnected.classe_id,
            matiere_id: this.userConnected.matiere_id,
            enseignant_id: this.userConnected.id,
          }
        );
      }
    ).catch(
      err => console.log(err)
    );
  }

  onLoadEvaluations(id: string) {
    this.service.getById('evaluation/getEvaluationByProf', id).then(
      (res) => {
        this.allEvaluation = res[0].data[0];
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

  onAddEvaluation() {
    this.service.add('evaluation/add', this.addForm.value).then(
      (res) => {
        this.closeAddExpenseModal.nativeElement.click();
        this.onLoadEvaluations(this.userConnected.id);
        this.notiflix.notify('success', "Evaluation ajouté avec succées");
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  // Fonction pour créer un nouveau formulaire d'utilisateur
  createForm(): FormGroup {
    return this.fb.group({
      id_evaluation: this.fb.control('', [Validators.required]),
      id_apprenant: this.fb.control('', [Validators.required]),
      valeur: this.fb.control(null, [Validators.required,])
    });
  }

  onGetEvaluation(id: string) {
    this.service.getById('evaluation/get', id).then(
      (res) => {
        this.evaluation = res[0].data[0];

        //remplir le formulaire de modification d'une evaluation
        this.updateForm.patchValue({
          date: this.evaluation.date,
          classe_id: this.evaluation.classe_id,
          matiere_id: this.evaluation.matiere_id,
          enseignant_id: this.evaluation.enseignant_id,
          etat: this.evaluation.etat,
          type: this.evaluation.type,
          semestre: this.evaluation.semestre,
        });

        //initialiser le tableau à zero à chaque fois on clique sur un evaluation
        this.studentNoteForms = [];

        //recuperer les etudiants de la classe qui a fait l'evaluation
        this.service.getById('apprenant/getByClasse', this.evaluation.classe_id).then(
          (res) => {
            //stockage
            this.studentByClasse = res[0].data;

            //initialiser le tableau qui verifi si l'etudiant a un note ou pas
            this.haveNote = [];

            //faire un boucle pour
            this.studentByClasse.forEach((elt: any) => {
              //recuperer les nom
              this.studentsName.push(elt.nomComplet);
              //recuperer les id
              this.studentsId.push(elt.id);
              //verifier si l'etudiant à un note ou pas
              this.service.getStudentNoteByIdEvaluation('note/getByIdApprenant', elt.id, { id_evaluation: this.evaluation.id }).then(
                (res) => {
                  if (res[0].status_code == 200) {
                    this.haveNote.push(true);
                  } else {
                    this.haveNote.push(false);
                  }
                }
              ).catch(
                (error) => {
                  console.log(error);
                }
              );
              //creation de formulaire
              this.studentNoteForms.push(this.createForm());
            })
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        );
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );


  }

  onGetStudentNote(id: string, index: number) {
    this.service.getStudentNoteByIdEvaluation('note/getByIdApprenant', id, { id_evaluation: this.evaluation.id }).then(
      (res) => {
        if (res[0].data != null) {
          this.studentNoteForms[index].patchValue({
            valeur: res[0].note
          })
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  onUpdateEvaluation(id: string) {
    this.service.update('evaluation/update', id, this.updateForm.value).then(
      (res) => {
        this.onLoadEvaluations(this.userConnected.id)
        this.closeAddExpenseModalUpdate.nativeElement.click();
        this.notiflix.notify('success', "Evaluation avec succées");
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  ondDeleteEvaluation(id: string) {
    this.service.delete('evaluation/delete', id).then(
      (res) => {
        console.log(res);

        this.onLoadEvaluations(this.userConnected.id);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  onAddNote(idApprenant: string, index: number) {
    this.studentNoteForms[index].patchValue({
      id_evaluation: this.evaluation.id,
      id_apprenant: idApprenant,
    });
    this.service.add('note/add', this.studentNoteForms[index].value).then(
      (res) => {
        this.notiflix.notify('success', "Note attribuer avec succées");
        this.haveNote[index] = true;
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  onUpdateNote(idApprenant: string, index: number) {
    this.studentNoteForms[index].patchValue({
      id_evaluation: this.evaluation.id,
      id_apprenant: idApprenant,
    });

   console.log( this.studentNoteForms[index].value);
   console.log(idApprenant);


    this.service.update('note/update',idApprenant  ,this.studentNoteForms[index].value).then(
      (res) => {
        this.notiflix.notify('success', "Note modifier avec succées");
        console.log(res);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
}
