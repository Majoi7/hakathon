<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmail extends Notification
{
    use Queueable;

    public $token;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $url = url("/api/verify-email?token={$this->token}");

        return (new MailMessage)
            ->subject('Confirmez votre adresse email')
            ->line('Merci de vous être inscrit ! Cliquez sur le bouton ci-dessous pour confirmer votre email.')
            ->action('Confirmer mon email', $url)
            ->line('Si vous n’avez pas créé de compte, ignorez cet email.');
    }
}
