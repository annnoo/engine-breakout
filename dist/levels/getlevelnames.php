<?php

print_all_filenames();

function print_all_filenames()
{
    header('Content-type: application/json');
    echo json_encode(get_all_json_files(__DIR__));
}

function get_all_json_files($dir)
{
    //filters out the . and .. file
    $files = array_diff(scandir($dir), array('.', '..'));
    $result = [];
    $dirName = pathinfo($dir, PATHINFO_BASENAME);
//    $prefix = './' . $dirName . '/';
    $prefix = '';

    foreach ($files as $file) {
        if (is_file($file) && file_exists($file)) {
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            if (strcasecmp($extension, 'json') === 0) {
                array_push($result, $prefix . $file);
            }
        }
    }

    return $result;
}
