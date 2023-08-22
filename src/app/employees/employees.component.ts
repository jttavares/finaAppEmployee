import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as firebaseDatabase from "@angular/fire/database";
import { Observable,  take, BehaviorSubject, Subscription} from 'rxjs';
// import { Observable } from 'rxjs';


import { Employee } from '../models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {





  constructor() {

  }

  ngOnInit() {

  }



}
