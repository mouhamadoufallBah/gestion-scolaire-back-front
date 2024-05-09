<?php

use Moohamad\ApiGestionScolaireBack\Core\Middleware;

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

require_once('./src/core/Middleware.php');
require_once('./src/core/JWT.php');
require_once("./src/core/Database.php");
require_once("./src/model/User.php");
require_once("./src/model/Apprenant.php");


$jwt = new Moohamad\ApiGestionScolaireBack\CORE\Jwt();

class ApprenantController
{

    public function index()
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $user = new Moohamad\ApiGestionScolaireBack\Model\Apprenant($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 1) {
                $statement = $user->getAll();

                if ($statement->rowCount() > 0) {
                    $data[] = $statement->fetchAll();

                    http_response_code(200);

                    echo json_encode([
                        [
                            "data" => $data,
                            "status_code" => 200
                        ]
                    ]);
                } else {
                    echo json_encode(
                        ['message' => "Aucun Apprenant disponible"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                );
            }
        } else {
            http_response_code(405);
            echo json_encode(
                ['message' => "Ce methode n'est pas autorisée"]
            );
        }
    }

    public function get(int $id)
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $user = new Moohamad\ApiGestionScolaireBack\Model\Apprenant($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 1 || $userConnected['role_id'] == 2 || $userConnected['role_id'] == 3) {
                $statement = $user->get($id);
                if ($statement->rowCount() > 0) {
                    $data = $statement->fetch();

                    http_response_code(200);

                    echo json_encode([
                        [
                            "data" => $data,
                            "status_code" => 200
                        ]
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode(
                        ['message' => "Cette utilisateur n'existe pas"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                );
            }
        } else {
            http_response_code(405);
            echo json_encode(
                ['message' => "Ce methode n'est pas autorisée"]
            );
        }
    }

    public function getByClasse(int $id)
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $user = new Moohamad\ApiGestionScolaireBack\Model\Apprenant($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 1 || $userConnected['role_id'] == 2) {
                $statement = $user->getByIdClasse($id);
                if ($statement->rowCount() > 0) {
                    $data = $statement->fetchAll();

                    http_response_code(200);

                    echo json_encode([
                        [
                            "data" => $data,
                            "status_code" => 200
                        ]
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode(
                        ['message' => "Cette utilisateur n'existe pas"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                );
            }
        } else {
            http_response_code(405);
            echo json_encode(
                ['message' => "Ce methode n'est pas autorisée"]
            );
        }
    }

    public function getLastFive()
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $user = new Moohamad\ApiGestionScolaireBack\Model\Apprenant($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 1) {
                $statement = $user->getLastFive();
                if ($statement->rowCount() > 0) {
                    $data = $statement->fetchAll();

                    http_response_code(200);

                    echo json_encode([
                        [
                            "data" => $data,
                            "status_code" => 200
                        ]
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode(
                        ['message' => "Il n' y a pas d' utilisateur"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                );
            }
        } else {
            http_response_code(405);
            echo json_encode(
                ['message' => "Ce methode n'est pas autorisée"]
            );
        }
    }

    public function add()
    {
        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $user = new Moohamad\ApiGestionScolaireBack\Model\Apprenant($db);

            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->nomComplet) && !empty($data->email) && !empty($data->password) && !empty($data->role_id) && !empty($data->etat) && !empty($data->classe_id)) {
                $user->nomComplet = htmlspecialchars($data->nomComplet);
                $user->email = htmlspecialchars($data->email);
                $user->password = htmlspecialchars($data->password);
                $user->role_id = intval($data->role_id);
                $user->etat = htmlspecialchars($data->etat);
                $user->classe_id = intval($data->classe_id);

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 1) {
                    $result = $user->create();

                    if ($result) {
                        http_response_code(201);
                        echo json_encode(
                            ['message' => "Apprenant ajouté avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "L'ajout de Apprenant à echouer"]
                        );
                    }
                } else {
                    echo json_encode(
                        ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Les données ne sont pas au complet"]
                );
            }
        } else {
            http_response_code(405);
            echo json_encode(
                ['message' => "Ce methode n'est pas autorisée"]
            );
        }
    }

    public function update(int $id)
    {
        if ($_SERVER['REQUEST_METHOD'] === "PUT") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $user = new Moohamad\ApiGestionScolaireBack\Model\Apprenant($db);

            $data = json_decode(file_get_contents("php://input"));
            if ($id && !empty($data->nomComplet) && !empty($data->email) && !empty($data->password) && !empty($data->role_id) && !empty($data->etat) && !empty($data->classe_id)) {
                $user->id = $id;
                $user->nomComplet = htmlspecialchars($data->nomComplet);
                $user->email = htmlspecialchars($data->email);
                $user->password = htmlspecialchars($data->password);
                $user->role_id = intval($data->role_id);
                $user->etat = htmlspecialchars($data->etat);
                $user->classe_id = intval($data->classe_id);

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 1) {
                    $result = $user->update();

                    if ($result) {
                        http_response_code(201);
                        echo json_encode(
                            ['message' => "Apprenant a été modifier avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "La modifiaction du Apprenant à echouer"]
                        );
                    }
                } else {
                    echo json_encode(
                        ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Les données ne sont pas au complet"]
                );
            }
        } else {
            http_response_code(405);
            echo json_encode(
                ['message' => "Ce methode n'est pas autorisée"]
            );
        }
    }

    public function updateEtat(int $id)
    {
        if ($_SERVER['REQUEST_METHOD'] === "PUT") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $user = new Moohamad\ApiGestionScolaireBack\Model\Apprenant($db);

            $apprenant =$user->get($id)->fetch();
            if ($apprenant) {
                $user->id = $id;
                $user->etat = $apprenant['etat'] == "Actif" ? "Inactif" : "Actif";

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 1) {
                    $result = $user->updateEtat();

                    if ($result) {
                        http_response_code(201);
                        echo json_encode(
                            ['message' => "Etat a été modifier avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "La modifiaction de l'etat à echouer"]
                        );
                    }
                } else {
                    echo json_encode(
                        ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                    );
                }
            } else {
                http_response_code(404);
                echo json_encode(
                    ['message' => "Cette utilisateur que vous essayer de modifier n'existe pas"]
                );
            }
        } else {
            http_response_code(405);
            echo json_encode(
                ['message' => "Ce methode n'est pas autorisée"]
            );
        }
    }

    public function delete(int $id)
    {
        if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $user = new Moohamad\ApiGestionScolaireBack\Model\Apprenant($db);

            $data = json_decode(file_get_contents("php://input"));

            if ($id) {
                $user->id = $id;

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 1) {
                    $result = $user->delete();

                    if ($result) {
                        http_response_code(200);
                        echo json_encode(
                            ['message' => "Apprenant supprimer avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "La supression du Apprenant à echouer"]
                        );
                    }
                } else {
                    echo json_encode(
                        ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Veuillez selectionner le Apprenant que vous voullez supprimer"]
                );
            }
        } else {
            http_response_code(405);
            echo json_encode(
                ['message' => "Ce methode n'est pas autorisée"]
            );
        }
    }
}
