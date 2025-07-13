<?php
$data = json_decode(file_get_contents("php://input"), true);
$numero = $data["numero"] ?? "";

if (!$numero || !preg_match("/^\+\d{8,15}$/", $numero)) {
  echo json_encode(["success" => false]);
  exit;
}

// Enregistrement local
file_put_contents("liste_whatsapp.txt", $numero . PHP_EOL, FILE_APPEND);

// Génération du lien
$lien = "https://lexouvriere.com/app.html?whatsapp=" . urlencode($numero);

// Envoi via API WhatsApp Business (à remplacer par ton propre appel API)
$message = "Bienvenue ! Voici ton accès sécurisé : $lien";
// Code ici pour utiliser ton API réelle

echo json_encode(["success" => true]);
?>

