<?php

namespace Moohamad\ApiGestionScolaireBack\Model;

class Evaluation
{
    public $table = "evaluation";
    public $connexion = null;

    public int $id;
    public $date;
    public int $classe_id;
    public int $matiere_id;
    public int $enseignant_id;
    public string $etat;
    public string $type;
    public string $semestre;

    public function __construct($db)
    {
        if ($this->connexion == null) {
            $this->connexion = $db;
        }
    }

    public function getAll()
    {
        $sql = "SELECT * FROM $this->table";

        $req = $this->connexion->query($sql);

        return $req;
    }

    public function get($id)
    {
        $sql = "SELECT * FROM $this->table WHERE id =:id";

        $req = $this->connexion->prepare($sql);
        $req->execute([':id' => $id]);
    
        return $req;
    }

    public function getByIdProf($idProf) {
        $sql = "SELECT * FROM $this->table WHERE enseignant_id = :idProf";
    
        $req = $this->connexion->prepare($sql);
        $req->execute([':idProf' => $idProf]);
    
        return $req;
    }

    public function create()
    {
        $sql = "INSERT INTO $this->table(date, classe_id, matiere_id, enseignant_id, etat, type, semestre) VALUES(:date, :classe_id, :matiere_id, :enseignant_id, :etat, :type, :semestre)";

        $req = $this->connexion->prepare($sql);

        $result = $req->execute([
            ":date" => $this->date,
            ":classe_id" => $this->classe_id,
            ":matiere_id" => $this->matiere_id,
            ":enseignant_id" => $this->enseignant_id,
            ":etat" => $this->etat,
            ":type" => $this->type,
            ":semestre" => $this->semestre,
        ]);


        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function update()
    {
        $sql = "UPDATE $this->table SET date=:date, classe_id=:classe_id, matiere_id=:matiere_id, enseignant_id=:enseignant_id, etat=:etat, type=:type, semestre=:semestre WHERE id=:id";

        $req = $this->connexion->prepare($sql);

        $result = $req->execute([
            ":date" => $this->date,
            ":classe_id" => $this->classe_id,
            ":matiere_id" => $this->matiere_id,
            ":enseignant_id" => $this->enseignant_id,
            ":etat" => $this->etat,
            ":type" => $this->type,
            ":semestre" => $this->semestre,
            ":id" => $this->id
        ]);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function delete()
    {
        $sql = "DELETE FROM $this->table WHERE id= :id";

        $req = $this->connexion->prepare($sql);

        $result = $req->execute(array(":id" => $this->id));

        if ($result) {
            return true;
        } else {
            return false;
        }
    }
}
