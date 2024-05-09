<?php

namespace Moohamad\ApiGestionScolaireBack\Model;

class User
{
    public $table = "user";
    public $connexion = null;

    public int $id;
    public string $nomComplet;
    public string $email;
    public string $password;
    public string $role_id;
    public string $etat;

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
        $sql = "INSERT INTO $this->table(nomComplet, email, password, role_id, etat) VALUE(:nomComplet, :email, :password, :role_id, :etat)";

        $req =  $this->connexion->prepare($sql);

        $result = $req->execute([
            ":nomComplet" => $this->nomComplet,
            ":email" => $this->email,
            ":password" => password_hash($this->password, PASSWORD_BCRYPT),
            ":role_id" => $this->role_id,
            ":etat" => $this->etat
        ]);

        if ($result) {
            return true;
        } else {
            return false;
        }
    }

    public function update()
    {
        $sql = "UPDATE $this->table SET nomComplet=:nomComplet, email=:email, password=:password, role_id=:role_id, etat=:etat WHERE id=:id";

        $req =  $this->connexion->prepare($sql);

        $result = $req->execute([
            ":nomComplet" => $this->nomComplet,
            ":email" => $this->email,
            ":password" => password_hash($this->password, PASSWORD_BCRYPT),
            ":role_id" => $this->role_id,
            ":etat" => $this->etat,
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

    public function login(string $email, string $password)
    {
        $sql = "SELECT email, password, nomComplet, role_id, etat, id, 'user' AS type
        FROM user
        WHERE email = :email
        UNION
        SELECT email, password, nomComplet, role_id, etat, id, 'enseignant' AS type
        FROM enseignant
        WHERE email = :email
        UNION
        SELECT email, password, nomComplet, role_id, etat, id, 'apprenant' AS type
        FROM apprenant
        WHERE email = :email;";

        $stmt = $this->connexion->prepare($sql);
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if (!$user) {
            return false;
        }

        // Vérification du mot de passe
        if (password_verify($password, $user['password'])) {
            return $user;
        } else {
            return false;
        }
    }
}
