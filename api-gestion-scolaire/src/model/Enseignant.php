<?php 
namespace Moohamad\ApiGestionScolaireBack\Model;

class Enseignant extends User
{
    public $table = "enseignant";
    public $connexion = null;

    public int $matiere_id;
    public int $classe_id;

    public function getAll() {
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

    public function getLastFive() {
        $sql = "SELECT * FROM $this->table ORDER BY id DESC LIMIT 5";
    
        $req = $this->connexion->query($sql);
    
        return $req;
    }

    public function create()
    {
        $sql = "INSERT INTO $this->table(nomComplet, email, password, role_id, etat, matiere_id, classe_id) VALUE(:nomComplet, :email, :password, :role_id, :etat, :matiere_id, :classe_id)";

        $req =  $this->connexion->prepare($sql);

        $result = $req->execute([
            ":nomComplet" => $this->nomComplet,
            ":email" => $this->email,
            ":password" => password_hash($this->password, PASSWORD_BCRYPT),
            ":role_id" => $this->role_id,
            ":etat" => $this->etat,
            ":matiere_id" => $this->matiere_id,
            ":classe_id" => $this->classe_id
        ]);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function update()
    {
        $sql = "UPDATE $this->table SET nomComplet=:nomComplet, email=:email, password=:password, role_id=:role_id, etat=:etat, matiere_id=:matiere_id, classe_id=:classe_id WHERE id=:id";

        $req =  $this->connexion->prepare($sql);

        $result = $req->execute([
            ":nomComplet" => $this->nomComplet,
            ":email" => $this->email,
            ":password" =>password_hash($this->password, PASSWORD_BCRYPT),
            ":role_id" => $this->role_id,
            ":etat" => $this->etat,
            ":matiere_id" => $this->matiere_id,
            ":classe_id" => $this->classe_id,
            "id" => $this->id
        ]);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function updateEtat()
    {
        $sql = "UPDATE $this->table SET etat=:etat WHERE id=:id";

        $req = $this->connexion->prepare($sql);

        $result = $req->execute([
            ":etat" => $this->etat,
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