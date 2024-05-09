export interface User{
  id: string,
  nomComplet: string,
  email: string,
  password: string,
  role_id: string,
  etat: boolean
}

export interface Teacher{
  id: string,
  nomComplet: string,
  email: string,
  password: string,
  role_id: string,
  matiere_id: string,
  classe_id: string,
  etat: string
}

export interface Student{
  id: string,
  nomComplet: string,
  email: string,
  password: string,
  role_id: string,
  classe_id: string,
  etat: string
}

export interface Role{
  id: string,
  nom: string,
}

export interface Subject{
  id: string,
  nom: string,
  description: string,
}

export interface Classe{
  id: string,
  nom: string,
  anneescolaire: string,
}

export interface Evaluation {
  id: string;
  date: string;
  classe_id: string;
  matiere_id: string;
  enseignant_id: string;
  etat: string;
  type: string;
  semestre: string;
}
