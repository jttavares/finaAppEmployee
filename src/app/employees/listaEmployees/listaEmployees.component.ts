import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as firebaseDatabase from "@angular/fire/database";
import { Observable,  take, BehaviorSubject, Subscription, tap} from 'rxjs';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";

import { Employee } from 'src/app/models/employee';
import { CadastroEmployeesComponent } from '../cadastroEmployees/cadastroEmployees.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-listaEmployees',
  templateUrl: './listaEmployees.component.html',
  styleUrls: ['./listaEmployees.component.css'],
  imports: [CommonModule, CadastroEmployeesComponent,FontAwesomeModule],
  providers: [],
  standalone: true,
})
export class ListaEmployeesComponent implements OnInit, OnDestroy {

  employees$:BehaviorSubject<Employee[]>= new BehaviorSubject<Employee[]>([]);
  subscriptions:Subscription[]=[];

  employeesDatabaseRef = firebaseDatabase.ref(this._database, 'empregados');
  keyToUpdate:string="";

  databaseKeysRef:any={};

  actionToPerform="none";

  selectedEmployee:any;

  showControls=false;
  indexControl=-1;

  faEdit = faPenToSquare;
  faDelete = faTrash;

  tooltips={
    editar: "Clique aqui para editar o empregado",
    excluir: "Clique aqui para excluir o empregado",
  }



  constructor(private _database:firebaseDatabase.Database) {

  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  update(employee:Employee):void{
    this.actionToPerform = "Atualizar";
    this.selectedEmployee = employee;
    const selectedKey = employee.id;
    this.keyToUpdate = this.databaseKeysRef[selectedKey];

  }

  openControl(index:number){
    this.showControls=true;
    this.indexControl=index;

  }



  delete(employee:Employee):void{
    Swal.fire({
      title: `Deseja mesmo remover ${employee.nome} ${employee.sobrenome}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Remover',
      denyButtonText: `Não Remover`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.actionToPerform = "Deletar";
        const selectedKey = employee.id;
        this.keyToUpdate = this.databaseKeysRef[selectedKey]
        this.selectedEmployee=employee;

        const key = this.keyToUpdate;
        const employeeRef = firebaseDatabase.ref(this._database, `empregados/${key}` )

              try {
                firebaseDatabase.remove(employeeRef);
                Swal.fire({
                  title: 'Sucesso 😍',
                  text: "Empregado removido com sucesso!",
                  icon: 'success'
                })
              } catch (error) {
                Swal.fire({
                  title: 'Ah que pena! :(',
                  text: `Não foi possível remover o empregado! Erro: ${error}` ,
                  icon: 'error'
                })
              }
      } else if (result.isDenied) {
        Swal.fire('Remoção cancelada', '', 'info')
      }
    })
  }

  finishedCrud(){
    this.actionToPerform="none";
    this.selectedEmployee=undefined;
    this.indexControl = -1;
    this.getAllEmployees();
  }


  public getAllEmployees():Observable<Employee[]>{
   this.subscriptions.push(firebaseDatabase.objectVal<Employee[]>(this.employeesDatabaseRef)
    .pipe(
      take(1),
      tap(employes=> {
        for (const key in employes) {
          this.databaseKeysRef[employes[key].id] = key;
        }
      }),
      )
    .subscribe((response:Employee[])=>{
      const array = Object.values(response)
      this.employees$.next(array);

      this.unsubscribe();
    }))
    return this.employees$.asObservable();


  }
  private unsubscribe(){
    this.subscriptions.forEach(sub=> sub.unsubscribe())
  }

}
