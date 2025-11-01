<!DOCTYPE html>
<html>
<head>
    <title>Confirme ton email</title>
</head>
<body>
    <p>Salut {{ $name }},</p>
    <p>Merci de t’être inscrit ! Clique sur ce lien pour confirmer ton email :</p>
    <p><a href="{{ url('/api/verify-email/'.$token) }}">Confirmer mon email</a></p>
    <p>Si ce n’est pas toi, ignore ce message.</p>
</body>
</html>
