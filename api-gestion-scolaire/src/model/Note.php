<?php

namespace Moohamad\ApiGestionScolaireBack\Model;

class Note
{
    public $table = "note";
    public $connexion = null;
    public int $id;
    public int $id_evaluation;
    public int $id_apprenant;
    public int $valeur;

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

    public function getByIdApprenant($id, $id_evaluation) {
        $sql = "SELECT * FROM $this->table WHERE id_apprenant =:id_apprenant AND id_evaluation =:id_evaluation";
    
        $req = $this->connexion->prepare($sql);
        $req->execute([
            ':id_apprenant' => $id,
            ':id_evaluation' => $id_evaluation,
        ]);
    
        return $req;
    }

    public function create()
    {
        $sql = "INSERT INTO $this->table(id_evaluation, id_apprenant, valeur) VALUE(:id_evaluation, :id_apprenant, :valeur)";

        $req =  $this->connexion->prepare($sql);

        $result = $req->execute([
            ":id_evaluation" => $this->id_evaluation,
            ":id_apprenant" => $this->id_apprenant,
            ":valeur" => $this->valeur,
        ]);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function update()
    {
        $sql = "UPDATE $this->table SET id_apprenant=:id_apprenant, id_evaluation=:id_evaluation, valeur=:valeur WHERE id=:id";

        $req =  $this->connexion->prepare($sql);

        $result = $req->execute([
            ":id_evaluation" => $this->id_evaluation,
            ":id_apprenant" => $this->id_apprenant,
            ":valeur" => $this->valeur,
            "id" => $this->id
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
