<?php

namespace App\Services;

use GuzzleHttp\Client;

class EmailVerifier
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('MAILBOXLAYER_API_KEY');
    }

    /**
     * Vérifie l'email via Mailboxlayer.
     * Retourne true si l'email est valide, sinon false.
     */
    public function verify(string $email): bool
    {
        try {
            $response = $this->client->get('http://apilayer.net/api/check', [
                'query' => [
                    'access_key' => $this->apiKey,
                    'email'      => $email,
                    'smtp'       => 1,
                    'format'     => 1
                ],
                'timeout' => 10
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            // Vérifie la validité du format et le SMTP
            return isset($data['format_valid'], $data['smtp_check']) &&
                $data['format_valid'] === true &&
                $data['smtp_check'] === true;
        } catch (\Exception $e) {
            // Journaliser l'erreur si nécessaire
            return false;
        }
    }
}
