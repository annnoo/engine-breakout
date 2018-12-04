<?php

header('Content-type: text/plain');
echo saveUploadedLevel();

//returns a boolean (success value)
function saveUploadedLevel()
{
    if ($_SERVER["REQUEST_METHOD"] !== "POST") return false;

    $tmpFile = $_FILES['fileToUpload']['tmp_name'];
    $fullName = test_name($_FILES['fileToUpload']['name']);

    if (!empty($fullName)) {

        $info = pathinfo($fullName);
        $name = $info['filename'];
        $extension = $info['extension'];

        if (strcasecmp($extension, 'json') !== 0) return false;

        $target = "./" . $name . '.' . $extension;

        $counter = 1;
        while (file_exists($target)) {
            $target = "./" . $name . ' (' . $counter . ').' . $extension;
            $counter++;
        }

        move_uploaded_file($tmpFile, $target);

        return true;
    }

    return false;
}

function test_name($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
