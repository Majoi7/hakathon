<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
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
        $frontendUrl = config('app.frontend_url');

        $url = "{$frontendUrl}/reset-password?token={$this->token}&email={$notifiable->email}";

        return (new MailMessage)
            ->subject('Réinitialisation de votre mot de passe sur MonProf')
            ->greeting("Bonjour {$notifiable->name},")
            ->line("Vous avez demandé à réinitialiser votre mot de passe.")
            ->action('Réinitialiser le mot de passe', $url)
            ->line("Si vous n’avez pas demandé cette réinitialisation, ignorez simplement cet e-mail.")
            ->salutation('Cordialement, L’équipe MonProf');
    }
}
