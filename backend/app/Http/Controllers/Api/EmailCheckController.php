<?php

namespace App\Http\Controllers\Api;

use GuzzleHttp\Client;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class EmailCheckController extends Controller
{

    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('MAILVERIFIER_API_KEY'); // à mettre dans .env
    }

    public function verify($email)
    {
        try {
            $response = $this->client->get('https://apilayer.net/api/check', [
                'query' => [
                    'access_key' => $this->apiKey,
                    'email' => $email,
                    'smtp' => 1,       // vérification SMTP
                    'format' => 1
                ],
                'timeout' => 5
            ]);

            $data = json_decode($response->getBody(), true);

            // Retourne true si l’email est valide et existe
            return $data['format_valid'] && $data['smtp_check'];
        } catch (\Exception $e) {
            return false;
        }
    }
}
