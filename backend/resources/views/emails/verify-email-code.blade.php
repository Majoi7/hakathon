<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Code de vérification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px;">
        <h2 style="color: #333;">Salut {{ $name }} !</h2>
        <p>Merci de t'être inscrit sur <strong>MonProf</strong>.</p>
        <p>Voici ton <strong>code de confirmation à 6 chiffres</strong> :</p>
        <h1 style="text-align: center; color: #2d89ef; letter-spacing: 4px;">{{ $code }}</h1>
        <p>Ce code est valable pendant 10 minutes.</p>
        <p>Si tu n’as pas demandé ce code, ignore ce message.</p>
        <hr>
        <p style="font-size: 12px; color: #999;">© 2025 MonProf. Tous droits réservés.</p>
    </div>
</body>
</html>
