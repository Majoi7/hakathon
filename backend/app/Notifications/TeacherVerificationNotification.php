<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class TeacherVerificationNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $status,
        public ?string $reason = null
    ) {}

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        $subject = $this->status === 'approved'
            ? 'Votre compte professeur a été approuvé !'
            : 'Statut de votre compte professeur';

        return (new MailMessage)
            ->subject($subject)
            ->line($this->getMessage())
            ->action('Voir mon profil', url('/teacher/profile'))
            ->line('Merci de votre confiance !');
    }

    public function toDatabase($notifiable)
    {
        return [
            'type' => 'teacher_verification',
            'status' => $this->status,
            'message' => $this->getMessage(),
            'timestamp' => now()->toISOString()
        ];
    }

    private function getMessage()
    {
        if ($this->status === 'approved') {
            return 'Félicitations ! Votre compte professeur a été approuvé. Vous pouvez maintenant recevoir des réservations.';
        } else {
            return "Votre compte professeur a été rejeté. Raison : " . ($this->reason ?? 'Non spécifiée');
        }
    }
}
