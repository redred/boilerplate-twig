<?php
  require_once("../composer_modules/twig/twig/lib/Twig/Autoloader.php");
  Twig_Autoloader::register();
  $twig = new Twig_Environment(new Twig_Loader_Filesystem("./templates/"));
  $tpl = $twig->loadTemplate( "base.html" );
  $page_data = array(
    'layout' => 'layout-home.html'
  );
  echo $tpl->render($page_data);
?>
