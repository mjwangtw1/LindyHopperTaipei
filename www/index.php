<?php
// index.php - Main entrance for files.

define('DIR_VENDOR', __DIR__.'/vendor/');
// Autoloader
if (file_exists(DIR_VENDOR . 'autoload.php')) {
    require_once(DIR_VENDOR . 'autoload.php');
}

$config = require_once '_conf/config.php';
$app = new Slim\App($config);

$dotEnv = Dotenv\Dotenv::create(__DIR__.'/_conf/');
$dotEnv->load();

// Twig Related
// Get container
$container = $app->getContainer();
// Register component on container
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig('templates', [
        'cache' => false
        //'cache' => 'path/to/cache'
    ]);

    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $container->get('request')->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($container->get('router'), $basePath));

    return $view;
};

/*
 * Load Routes
 */
$routeFiles = glob('app/Route/*.php');
foreach ($routeFiles as $file) {
    require_once $file;
}


$app->run();