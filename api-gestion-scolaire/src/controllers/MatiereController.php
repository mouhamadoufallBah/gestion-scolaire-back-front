<?php

use Moohamad\ApiGestionScolaireBack\Core\Middleware;

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

require_once('./src/core/JWT.php');
require_once('./src/core/Middleware.php');
require_once("./src/core/Database.php");
require_once("./src/model/Matiere.php");

class MatiereController
{
    public function index()
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $matiere = new Moohamad\ApiGestionScolaireBack\Model\Matiere($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 1 || $userConnected['role_id'] == 2 || $userConnected['role_id'] == 3) {
                $statement = $matiere->getAll();

                if ($statement->rowCount() > 0) {
                    $data[] = $statement->fetchAll(PDO::FETCH_ASSOC);

                    http_response_code(200);

                    echo json_encode([
                        [
                            "data" => $data,
                            "status_code" => 200
                        ]
                    ]);
                } else {
                    echo json_encode(
                        ['message' => "Aucun Matiere non disponible"]
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

            $matiere = new Moohamad\ApiGestionScolaireBack\Model\Matiere($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 1) {
                $statement = $matiere->get($id);

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
                    echo json_encode(
                        ['message' => "Aucun Classe non disponible"]
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

            $matiere = new Moohamad\ApiGestionScolaireBack\Model\Matiere($db);

            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->nom) && !empty($data->description)) {
                $matiere->nom = htmlspecialchars($data->nom);
                $matiere->description = htmlspecialchars($data->description);

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 1) {
                    $result = $matiere->create();

                    if ($result) {
                        http_response_code(201);
                        echo json_encode(
                            ['message' => "Matiere ajouté avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "L'ajout de Matiere à echouer"]
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

            $matiere = new Moohamad\ApiGestionScolaireBack\Model\Matiere($db);

            $data = json_decode(file_get_contents("php://input"));
            if ($id && !empty($data->nom) && !empty($data->description) ) {
                $matiere->id = $id;
                $matiere->nom = htmlspecialchars($data->nom);
                $matiere->description = htmlspecialchars($data->description);

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 1) {
                    $result = $matiere->update();

                    if ($result) {
                        http_response_code(201);
                        echo json_encode(
                            ['message' => "Matiere a été modifier avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "La modifiaction du Matiere à echouer"]
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

    public function delete(int $id)
    {
        if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $matiere = new Moohamad\ApiGestionScolaireBack\Model\Matiere($db);

            if ($id) {
                $matiere->id = $id;

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 1) {
                    $result = $matiere->delete();

                    if ($result) {
                        http_response_code(200);
                        echo json_encode(
                            ['message' => "Matiere supprimer avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "La supression du Matiere à echouer"]
                        );
                    }
                } else {
                    echo json_encode(
                        ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Veuillez selectionner le Matiere que vous voullez supprimer"]
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
