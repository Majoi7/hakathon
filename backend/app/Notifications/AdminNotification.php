<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class AdminNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $type,
        public string $message,
        public array $data = []
    ) {}

    public function via($notifiable)
    {
        $channels = ['database', 'broadcast'];

        if ($notifiable->email && $this->shouldSendEmail($notifiable)) {
            $channels[] = 'mail';
        }

        if ($notifiable->whatsapp && $this->shouldSendWhatsApp($notifiable)) {
            $channels[] = 'whatsapp';
        }

        return $channels;
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject("Notification Admin - {$this->type}")
            ->line($this->message)
            ->action('Voir dans le dashboard', url('/admin/dashboard'))
            ->line('Merci de votre vigilance !');
    }

    public function toDatabase($notifiable)
    {
        return [
            'type' => $this->type,
            'message' => $this->message,
            'data' => $this->data,
            'timestamp' => now()->toISOString()
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'id' => $this->id,
            'type' => $this->type,
            'message' => $this->message,
            'data' => $this->data
        ]);
    }

    private function shouldSendEmail($notifiable)
    {
        return in_array('email', $notifiable->notification_preferences ?? ['email']);
    }

    private function shouldSendWhatsApp($notifiable)
    {
        return in_array('whatsapp', $notifiable->notification_preferences ?? []);
    }
}
