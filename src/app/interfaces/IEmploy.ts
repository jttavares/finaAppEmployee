import { FormControl } from "@angular/forms";

export interface IEmployee {
  id:FormControl<string|null>;
  nome?: FormControl<string|null>;
  salario:FormControl<string|null>;
  idade:FormControl<number|null>;
  genero:FormControl<string|null>;
  sobrenome:FormControl<string|null>;
  telefone:FormControl<string|null>;
  endereco:FormControl<string|null>;
  corCabelo:FormControl<string|null>;
  foto:FormControl<string|null>;
}
