<?php
// config.php
//require '_conf.php';

define('SLIM_ROOT', __DIR__);

return array(
    'debug' => false,
    'mode'  => 'production',
    'templates.path' => __DIR__ . '/templates',
    'settings' => [
        'displayErrorDetails' => false,
    ],
);