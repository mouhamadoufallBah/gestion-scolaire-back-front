<?php

use Moohamad\ApiGestionScolaireBack\Core\Middleware;

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

require_once('./src/core/JWT.php');
require_once('./src/core/Middleware.php');
require_once("./src/core/Database.php");
require_once("./src/model/Note.php");

class NoteController
{
    public function index()
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $note = new Moohamad\ApiGestionScolaireBack\Model\Note($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 1 || $userConnected['role_id'] == 2 || $userConnected['role_id'] == 3) {
                $statement = $note->getAll();

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
                        ['message' => "Aucun Note non disponible"]
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

    public function getByIdApprenant(int $id)
    {
        if ($_SERVER['REQUEST_METHOD'] === "POST") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $note = new Moohamad\ApiGestionScolaireBack\Model\Note($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            $data = json_decode(file_get_contents("php://input"));
            if($data->id_evaluation){
                $id_evaluation = intval($data->id_evaluation);
            }else {
                http_response_code(400);
                echo json_encode(
                    [
                        'message' => "Veullez renseingner le l'id de l'évaluation",
                        "status_code" => 200,
                        "note" => null
                    ]
                );
                exit;
            }

            if ($userConnected['role_id'] == 1 || $userConnected['role_id'] == 2 || $userConnected['role_id'] == 3 ) {
                $statement = $note->getByIdApprenant($id, $id_evaluation);

                if ($statement->rowCount() > 0) {
                    $data = $statement->fetch();

                    http_response_code(200);

                    echo json_encode([
                        [
                            "data" => $data,
                            "status_code" => 200,
                            "note" => $data['valeur']
                        ]
                    ]);
                } else {
                    echo json_encode([
                        [
                            'message' => "Pas de Note disponible",
                            "status_code" => 204,
                            "note" => 0
                        ]
                    ]);
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

            $note = new Moohamad\ApiGestionScolaireBack\Model\Note($db);

            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->id_evaluation) && !empty($data->id_apprenant) && !empty($data->valeur)) {
                $note->id_evaluation = intval($data->id_evaluation);
                $note->id_apprenant = intval($data->id_apprenant);
                $note->valeur = intval($data->valeur);

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 2) {
                    $result = $note->create();

                    if ($result) {
                        http_response_code(201);
                        echo json_encode(
                            ['message' => "Note ajouté avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "L'ajout de Note à echouer"]
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

            $note = new Moohamad\ApiGestionScolaireBack\Model\Note($db);

            $data = json_decode(file_get_contents("php://input"));
            if ($id && !empty($data->id_evaluation) && !empty($data->id_apprenant) && !empty($data->valeur)) {
                $note->id = $id;
                $note->id_evaluation = intval($data->id_evaluation);
                $note->id_apprenant = intval($data->id_apprenant);
                $note->valeur = intval($data->valeur);

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 2) {
                    $result = $note->update();

                    if ($result) {
                        http_response_code(201);
                        echo json_encode(
                            ['message' => "Note a été modifier avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "La modifiaction du Note à echouer"]
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

            $note = new Moohamad\ApiGestionScolaireBack\Model\Note($db);

            if ($id) {
                $note->id = $id;

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 2) {
                    $result = $note->delete();

                    if ($result) {
                        http_response_code(200);
                        echo json_encode(
                            ['message' => "Note supprimer avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "La supression du Note à echouer"]
                        );
                    }
                } else {
                    echo json_encode(
                        ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Veuillez selectionner le Note que vous voullez supprimer"]
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
