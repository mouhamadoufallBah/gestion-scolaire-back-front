import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Classe } from '../../../core/utils/interfaces';
import { ClasseService } from '../../../core/services/classe/classe.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenericService } from '../../../core/services/generic-service/generic.service';
import { classeRoute } from '../../../core/utils/constante';

@Component({
  selector: 'app-gestion-classe',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gestion-classe.component.html',
  styleUrl: './gestion-classe.component.scss'
})
export class GestionClasseComponent implements OnInit {
  public classes: Classe[] = [];
  public classe!: Classe;

  updateForm!: FormGroup;
  addForm!: FormGroup;

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef; //closing the bootstrap modal

  constructor(private classeServices: ClasseService, private fb: FormBuilder, private genericService: GenericService) {
    this.addForm = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    });

    this.updateForm = this.fb.group({
      nom: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    });
  }

  ngOnInit(): void {
    this.onLoadAllClasse();
  }

  // onLoadAllClasse(){
  //   this.classeServices.getAllClasse().then(
  //     (res) => {
  //       this.classes = res
  //     }
  //   ).catch(
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }

  onLoadAllClasse() {
    this.genericService.getAll('classe').then(
      (res) => {
        this.classes = res[0].data;
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  // onAddClasse(){
  //   this.classeServices.addClasse(this.addForm.value).then(
  //     (res) => {
  //       this.addForm.reset();
  //       this.onLoadAllClasse();
  //     }
  //   ).catch(
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }
  onAddClasse() {
    this.genericService.add('classe/add', this.addForm.value).then(
      (res) => {
        this.addForm.reset();
        this.onLoadAllClasse();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }

  // onGetClasseToUpdate(id: string){
  //   this.classeServices.getClasseById(id).then(
  //     (res) => {
  //       this.classe = res
  //       this.updateForm.patchValue({
  //         nom: this.classe.nom,
  //         anneescolaire: this.classe.anneescolaire
  //       })
  //     }
  //   ).catch(
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }
  onGetClasseToUpdate(id: string) {
    this.genericService.getById('classe/get', id).then(
      (res) => {
        this.classe = res[0].data

        this.updateForm.patchValue({
          nom: this.classe.nom
        });
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }


  // onUpdateClasse(id: string){
  //   this.classeServices.updateClasse(id, this.updateForm.value).then(
  //     (res) => {
  //       this.closeAddExpenseModal.nativeElement.click();
  //       this.onLoadAllClasse();
  //     }
  //   ).catch(
  //     (err) => {
  //       console.log(err);

  //     }
  //   )
  // }

  onUpdateClasse(id: string) {
    this.genericService.update('classe/update', id, this.updateForm.value).then(
      (res) => {
        this.closeAddExpenseModal.nativeElement.click();
        this.onLoadAllClasse();
      }
    ).catch(
      (err) => {
        console.log(err);

      }
    );
  }


  // onDeleteClasse(id: string){
  //   this.classeServices.deleteClasse(id).then(
  //     (res) => {
  //       this.onLoadAllClasse();
  //     }
  //   ).catch(
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }
  onDeleteClasse(id: string) {
    this.genericService.delete('classe/delete', id).then(
      (res) => {
        this.onLoadAllClasse();
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }

}
