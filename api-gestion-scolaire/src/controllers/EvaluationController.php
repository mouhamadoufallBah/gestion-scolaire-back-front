<?php

use Moohamad\ApiGestionScolaireBack\Core\Middleware;

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

require_once('./src/core/JWT.php');
require_once('./src/core/Middleware.php');
require_once("./src/core/Database.php");
require_once("./src/model/Evaluation.php");

class EvaluationController
{
    public function index()
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $evaluation = new Moohamad\ApiGestionScolaireBack\Model\Evaluation($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 1 || $userConnected['role_id'] == 2 || $userConnected['role_id'] == 3) {
                $statement = $evaluation->getAll();

                if ($statement->rowCount() > 0) {
                    $data = $statement->fetchAll();

                    http_response_code(200);

                    echo json_encode(
                        [
                            "data" => $data,
                            "status_code" => 200
                        ]
                    );
                } else {
                    echo json_encode(
                        [
                            "data" => [],
                            'message' => "Aucun Evaluation non disponible"
                        ]
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

    public function getEvaluationByProf(int $id)
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $evaluation = new Moohamad\ApiGestionScolaireBack\Model\Evaluation($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 2) {
                $statement = $evaluation->getByIdProf($id);

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
                        ['message' => "Aucun Evaluation non disponible"]
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

    public function get($id)
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $evaluation = new Moohamad\ApiGestionScolaireBack\Model\Evaluation($db);

            $midlleware = new Middleware();
            $userConnected = $midlleware->midleware();

            if ($userConnected['role_id'] == 2) {
                $statement = $evaluation->get($id);

                if ($statement->rowCount() > 0) {
                    $data[] = $statement->fetch();

                    http_response_code(200);

                    echo json_encode([
                        [
                            "data" => $data,
                            "status_code" => 200
                        ]
                    ]);
                } else {
                    echo json_encode(
                        ['message' => "Aucun Evaluation non disponible"]
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

            $evaluation = new Moohamad\ApiGestionScolaireBack\Model\Evaluation($db);

            $data = json_decode(file_get_contents("php://input"));

            if (!empty($data->date) && !empty($data->classe_id) && !empty($data->matiere_id) && !empty($data->enseignant_id) && !empty($data->etat) && !empty($data->type) && !empty($data->semestre)) {
                $evaluation->date = htmlspecialchars($data->date);
                $evaluation->classe_id = intval($data->classe_id);
                $evaluation->matiere_id = intval($data->matiere_id);
                $evaluation->enseignant_id = intval($data->enseignant_id);
                $evaluation->etat = htmlspecialchars($data->etat);
                $evaluation->type = htmlspecialchars($data->type);
                $evaluation->semestre = htmlspecialchars($data->semestre);

                $middleware = new Middleware();
                $userConnected = $middleware->midleware();

                if ($userConnected['role_id'] == 2) {
                    $result = $evaluation->create();

                    if ($result) {
                        http_response_code(201);
                        echo json_encode(['message' => "Évaluation ajoutée avec succès"]);
                    } else {
                        http_response_code(503);
                        echo json_encode(['message' => "L'ajout de l'évaluation a échoué"]);
                    }
                } else {
                    http_response_code(403);
                    echo json_encode(['message' => "Vous n'êtes pas autorisé à effectuer cette action"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(['message' => "Les données ne sont pas complètes"]);
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

            $evaluation = new Moohamad\ApiGestionScolaireBack\Model\Evaluation($db);

            $data = json_decode(file_get_contents("php://input"));

            if ($id && !empty($data->date) && !empty($data->classe_id) && !empty($data->matiere_id) && !empty($data->enseignant_id) && !empty($data->etat) && !empty($data->type) && !empty($data->semestre)) {
                $evaluation->id = $id;
                $evaluation->date = htmlspecialchars($data->date);
                $evaluation->classe_id = intval($data->classe_id);
                $evaluation->matiere_id = intval($data->matiere_id);
                $evaluation->enseignant_id = intval($data->enseignant_id);
                $evaluation->etat = htmlspecialchars($data->etat);
                $evaluation->type = htmlspecialchars($data->type);
                $evaluation->semestre = htmlspecialchars($data->semestre);


                $middleware = new Middleware();
                $userConnected = $middleware->midleware();

                if ($userConnected['role_id'] == 2) {
                    $result = $evaluation->update();
                    
                    if ($result) {
                        http_response_code(200);
                        echo json_encode(['message' => "L'évaluation a été modifiée avec succès"]);
                    } else {
                        http_response_code(503);
                        echo json_encode(['message' => "La modification de l'évaluation a échoué"]);
                    }
                } else {
                    http_response_code(403);
                    echo json_encode(['message' => "Vous n'êtes pas autorisé à effectuer cette action"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(['message' => "Les données ne sont pas complètes ou l'ID est manquant"]);
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

            $evaluation = new Moohamad\ApiGestionScolaireBack\Model\Evaluation($db);

            if ($id) {
                $evaluation->id = $id;

                $midlleware = new Middleware();
                $userConnected = $midlleware->midleware();

                if ($userConnected['role_id'] == 2) {
                    $result = $evaluation->delete();

                    if ($result) {
                        http_response_code(200);
                        echo json_encode(
                            ['message' => "Evaluation supprimer avec succées"]
                        );
                    } else {
                        http_response_code(503);
                        echo json_encode(
                            ['message' => "La supression du Evaluation à echouer"]
                        );
                    }
                } else {
                    echo json_encode(
                        ['message' => "Vous n'êtes pas autorisé à faire cette action"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Veuillez selectionner le Evaluation que vous voullez supprimer"]
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
