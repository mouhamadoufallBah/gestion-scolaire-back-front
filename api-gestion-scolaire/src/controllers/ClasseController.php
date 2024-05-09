<?php

use Moohamad\ApiGestionScolaireBack\Core\Middleware;

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

require_once('./src/core/JWT.php');
require_once('./src/core/Middleware.php');
require_once("./src/core/Database.php");
require_once("./src/model/Classe.php");

class ClasseController
{
    public function index()
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $classe = new Moohamad\ApiGestionScolaireBack\Model\Classe($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 1 || $userConnected['role_id'] == 2 || $userConnected['role_id'] == 3) {
                $statement = $classe->getAll();

                if ($statement->rowCount() > 0) {
                    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

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

    public function get(int $id)
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $classe = new Moohamad\ApiGestionScolaireBack\Model\Classe($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 1) {
                $statement = $classe->get($id);

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

            $classe = new Moohamad\ApiGestionScolaireBack\Model\Classe($db);

            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->nom)) {
                $classe->nom = htmlspecialchars($data->nom);

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 1) {
                    $result = $classe->create();

                    if ($result) {
                        http_response_code(201);
                        echo json_encode(
                            ['message' => "Classe ajouté avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "L'ajout de Classe à echouer"]
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

            $classe = new Moohamad\ApiGestionScolaireBack\Model\Classe($db);

            $data = json_decode(file_get_contents("php://input"));
            if ($id && !empty($data->nom)) {
                $classe->id = $id;
                $classe->nom = htmlspecialchars($data->nom);

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 1) {
                    $result = $classe->update();

                    if ($result) {
                        http_response_code(201);
                        echo json_encode(
                            ['message' => "Classe a été modifier avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "La modifiaction du Classe à echouer"]
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

            $classe = new Moohamad\ApiGestionScolaireBack\Model\Classe($db);

            if ($id) {
                $classe->id = $id;

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 1) {
                    $result = $classe->delete();

                    if ($result) {
                        http_response_code(200);
                        echo json_encode(
                            ['message' => "Classe supprimer avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "La supression du Classe à echouer"]
                        );
                    }
                } else {
                    echo json_encode(
                        ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Veuillez selectionner le Classe que vous voullez supprimer"]
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
