<?php

use const Moohamad\ApiGestionScolaireBack\Core\SECRET;

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

require_once('./src/core/JWT.php');
require_once("./src/core/Database.php");
require_once("./src/model/User.php");

class UserController
{
    public function index()
    {
        if ($_SERVER['REQUEST_METHOD'] === "GET") {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();

            $db = $database->getConnexion();

            $user = new Moohamad\ApiGestionScolaireBack\Model\User($db);

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
                    ['message' => "Aucun Admin disponible"]
                );
            }
        } else {
            http_response_code(405);
            echo json_encode(
                ['message' => "Ce methode n'est pas autorisée"]
            );
        }
    }

    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] != 'POST') {
            http_response_code(405);
            echo json_encode(['message' => 'Méthode non autorisé']);
        } else {
            $database = new Moohamad\ApiGestionScolaireBack\Core\Database();
            $db = $database->getConnexion();
            $user = new Moohamad\ApiGestionScolaireBack\Model\User($db);

            $data = json_decode(file_get_contents("php://input"));
            if (!empty($data->email) && !empty($data->password)) {
                $user->email = htmlspecialchars($data->email);
                $user->password = htmlspecialchars($data->password);

                $result = $user->login($data->email, $data->password);

                if ($result) {
                    $header = [
                        'alg' => 'HS256',
                        'typ' => 'JWT'
                    ];
                    $jwt = new Moohamad\ApiGestionScolaireBack\CORE\Jwt();
                    $token = $jwt->generate($header, $result, SECRET);

                    // Création du cookie
                    // setcookie("jwt_token", $token, [
                    //     'expires' => time() + (86400 * 30),
                    //     'path' => '/',
                    //     'domain' => 'localhost:4200', 
                    //     'secure' => false,
                    //     'httponly' => true,
                    //     'samesite' => 'None;secure'
                    // ]);
                    // setcookie("user_connected", $data, time() + (86400 * 30), "/");

                    http_response_code(201);
                    echo json_encode(
                        [
                            'message' => "connexion avec succées",
                            'data' => $result,
                            'token' => $token
                        ]
                    );
                } else {
                    http_response_code(503);
                    echo json_encode(
                        ['message' => "Email ou mot de passe incorecte"]
                    );
                }
            } else {
                echo json_encode(
                    ['message' => "Les données ne sont pas au complet"]
                );
            }
        }
    }
}
