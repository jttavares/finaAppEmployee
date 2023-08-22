export interface Employee {
  id: string;
  salario: string;
  idade: number;
  genero: string;
  nome: string;
  sobrenome: string;
  telefone: string;
  endereco: string;
  corCabelo: string;
  foto: string;
}

export const defaultEmployee:Employee= {
  id: "",
  salario: "0",
  idade: 1,
  genero: "m",
  nome: "",
  sobrenome: "",
  telefone: "",
  endereco: "",
  corCabelo: "",
  foto: ""
}
