import { Component, Input, OnInit, Output,  EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import Swal from "sweetalert2";
import * as firebaseDatabase from "@angular/fire/database";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { IEmployee } from 'src/app/interfaces/IEmploy';
import { Employee, defaultEmployee } from 'src/app/models/employee';
import { take, Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-cadastroEmployees',
  templateUrl: './cadastroEmployees.component.html',
  styleUrls: ['./cadastroEmployees.component.css'],
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule,FontAwesomeModule]
})
export class CadastroEmployeesComponent implements OnInit {


  formCadastro:FormGroup<IEmployee> = this.createFormCadastro();
  errors:IEmployee[]=[];

  @Input() employeeToEdit:any = undefined;
  @Input() keyToUpdate:string="";

  @Input() actionToPerform="Salvar";

  @Output() public closeCadastroForm:EventEmitter<boolean>= new EventEmitter<boolean>();

  subscriptions:Subscription[]=[];

  selectedEmployee:Employee=defaultEmployee;

  faClose = faCircleXmark;

  tooltips={
    fechar: "Fechar",
  }



  constructor(private _database:firebaseDatabase.Database) { }

  ngOnInit() {
    if(this.employeeToEdit !== undefined){
      this.selectedEmployee = this.employeeToEdit;
      this.actionToPerform = "Atualizar";
      this.formCadastro = this.fillFormCadastro();
    }
  }

  createFormCadastro():FormGroup{
    return new FormGroup<IEmployee>({
      'id': new FormControl(""),
      'nome': new FormControl("", Validators.required),
      'sobrenome': new FormControl(""),
      'genero': new FormControl("",Validators.required ),
      'corCabelo': new FormControl(""),
      'foto': new FormControl(""),
      'idade': new FormControl(0),
      'salario': new FormControl("", [Validators.required, Validators.min(0)]),
      'telefone': new FormControl(""),
      'endereco': new FormControl("", Validators.required),
    });
  }

  fillFormCadastro():FormGroup{
    return new FormGroup<IEmployee>({
      'id': new FormControl(this.employeeToEdit.id),
      'nome': new FormControl(this.employeeToEdit.nome, Validators.required),
      'sobrenome': new FormControl(this.employeeToEdit.sobrenome),
      'genero': new FormControl(this.employeeToEdit.genero,Validators.required ),
      'corCabelo': new FormControl(this.employeeToEdit.corCabelo),
      'foto': new FormControl(this.employeeToEdit.foto),
      'idade': new FormControl(this.employeeToEdit.idade),
      'salario': new FormControl(this.employeeToEdit.salario, [Validators.required, Validators.min(0)]),
      'telefone': new FormControl(this.employeeToEdit.telefone),
      'endereco': new FormControl(this.employeeToEdit.endereco, Validators.required),
    });
  }

  closeForm(){
    this.closeCadastroForm.emit(true);
  }



  submit(){
    const employeesDatabaseRef = firebaseDatabase.ref(this._database, 'empregados');

    const salario= this.formCadastro.value.salario?.replaceAll('R$','').replaceAll('$','');
    this.formCadastro.value.salario = `R$ ${salario}`;

    if(this.actionToPerform === "Salvar"){
      const id =btoa(`${this.formCadastro.value.nome}${this.formCadastro.value.sobrenome}`);

      this.formCadastro.value.id = id;


      try {
        firebaseDatabase.push(employeesDatabaseRef, this.formCadastro.value);

        Swal.fire({
          title: 'Sucesso 😍',
          text: "Empregado cadastrado com sucesso!",
          icon: 'success'
        })

      } catch (error) {
        Swal.fire({
          title: 'Ah que pena! :(',
          text: "Não foi possível cadastrar o empregado!",
          icon: 'error'
        })
      }

    }


    else if(this.actionToPerform === "Atualizar"){

      try {
        const employeeRef = firebaseDatabase.ref(this._database, `empregados/${this.keyToUpdate}` )
        firebaseDatabase.update(employeeRef, this.formCadastro.value);

        this.closeCadastroForm.emit(true);

        Swal.fire({
          title: 'Sucesso 😍',
          text: "Empregado atualizado com sucesso!",
          icon: 'success'
        })

      } catch (error) {
        Swal.fire({
          title: 'Ah que pena! :(',
          text: "Não foi possível atualizar o empregado!",
          icon: 'error'
        })
      }
    }
    this.limparForm();
  }

  limparForm() {
    this.formCadastro.reset();
  }

}
