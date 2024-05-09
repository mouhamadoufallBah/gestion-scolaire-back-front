import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatiereService } from '../../../core/services/matiere/matiere.service';
import { Subject } from '../../../core/utils/interfaces';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenericService } from '../../../core/services/generic-service/generic.service';
import { matiereRoute } from '../../../core/utils/constante';

@Component({
  selector: 'app-gestion-matiere',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './gestion-matiere.component.html',
  styleUrl: './gestion-matiere.component.scss'
})
export class GestionMatiereComponent implements OnInit {
  public allSubjects: Subject[] = [];
  public subject!: Subject;

  updateForm!: FormGroup;
  addForm!: FormGroup;

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef; //closing the bootstrap modal

  constructor(private matiereService: MatiereService, private fb: FormBuilder, private genericService: GenericService) {
    this.addForm = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      description: this.fb.control('', [Validators.required, Validators.minLength(10)]),
    });

    this.updateForm = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      description: this.fb.control('', [Validators.required, Validators.minLength(10)]),
    });

  }

  ngOnInit(): void {
    this.onLoadAllSubject();
  }

  onAddSubject() {
    this.genericService.add('matiere/add',this.addForm.value).then(
      () => {
        this.addForm.reset();
        this.onLoadAllSubject();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onLoadAllSubject() {
    this.genericService.getAll('matiere').then(
      (res) => {
        this.allSubjects = res[0].data[0];
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onGetSubjectToUpdate(id: string) {
    this.genericService.getById('matiere/get', id).then(
      (res) => {
        this.subject = res[0].data;

        this.updateForm.patchValue({
          nom: this.subject.nom,
          description: this.subject.description
        });
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onUpdateSubject(id: string) {
    this.genericService.update('matiere/update', id, this.updateForm.value).then(
      (res) => {
        this.closeAddExpenseModal.nativeElement.click();
        this.onLoadAllSubject();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  onDeleteSubject(id: string) {
    this.genericService.delete('matiere/delete', id).then(
      (res) => {
        this.onLoadAllSubject();
        // console.log(res);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }

}

