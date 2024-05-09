<?php

namespace Moohamad\ApiGestionScolaireBack\Model;

class Classe
{
    public $table = "classe";
    public $connexion = null;

    public int $id;
    public string $nom;

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

    public function get($id) {
        $sql = "SELECT * FROM $this->table WHERE id = :id";
    
        $req = $this->connexion->prepare($sql);
        $req->execute([':id' => $id]);
    
        return $req;
    }

    public function create()
    {
        $sql = "INSERT INTO $this->table(nom) VALUE(:nom)";

        $req =  $this->connexion->prepare($sql);

        $result = $req->execute([
            ":nom" => $this->nom,
        ]);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function update()
    {
        $sql = "UPDATE $this->table SET nom=:nom WHERE id=:id";

        $req =  $this->connexion->prepare($sql);

        $result = $req->execute([
            ":nom" => $this->nom,
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
