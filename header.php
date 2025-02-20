<?php
/**
 * The index for our theme
 *
 * @link https://webdesign.wac.co.jp/
 *
 * @package WordPress
 * @subpackage WAC WAB DESIGN HP
 * @author WORK ASSIST
 * @since 2025. 1. 1
 * @version 1.0.0
 */
?>

<!DOCTYPE html>

<html <?php language_attributes(); ?>>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php bloginfo('name');
  wp_title('|', true, 'left'); ?></title>

  <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.ico">
  <!-- SP icon -->
  <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/images/web-logo.jpg">
  <!-- Windows icon -->
  <meta name="application-name" content="{WAC WEB DESIGN}" />
  <meta name="msapplication-square70x70logo"
    content="<?php echo get_template_directory_uri(); ?>/images/web-logo.jpg" />
  <meta name="msapplication-square150x150logo"
    content="<?php echo get_template_directory_uri(); ?>/images/web-logo.jpg" />
  <meta name="msapplication-wide310x150logo"
    content="<?php echo get_template_directory_uri(); ?>/images/web-logo.jpg" />
  <meta name="msapplication-square310x310logo"
    content="<?php echo get_template_directory_uri(); ?>/images/web-logo.jpg" />

  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/style.css">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
  <script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/assets/javascript.js"></script>

  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css">
  <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css">


  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

  <?php wp_body_open(); ?>

  <div id="page" class="site" loading="lazy">

    <header id="masthead" class="site-header" role="banner">

      <div id="top_head">

        <div class="inner">

          <?php $logo_url = get_the_logo_url('logo_url'); ?>
          <?php if ($logo_url): ?>

            <div class="logo">
              <a href="<?php echo home_url('/'); ?>">
                <img src="<?php echo get_the_logo_url(); ?>" alt="<?php bloginfo('name'); ?>" /></a>
            </div>

          <?php else: ?>

            <div class="logo-title">
              <a href="<?php echo home_url('/'); ?>">
                <?php bloginfo('name'); ?>
              </a>
            </div>

          <?php endif; ?>

          <div id="global-nav">

            <div class="pr">
              <p>WEBサイトの制作・運用・保守は株式会社ワークアシスト</p>
            </div>

            <div id="nav_toggle">
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <?php
            wp_nav_menu(array(
              'theme_location' => 'main-menu',
              'container' => 'nav',
              'add_a_class' => 'animsition-link',
            ));
            ?>

            <?php
            wp_nav_menu(array(
              'theme_location' => 'main-menu',
              'container' => 'div',
              'container_class' => 'sp-nav',
              'add_a_class' => 'animsition-link',
            ));
            ?>

          </div>

        </div>

      </div>

    </header>

    <?php if (is_category('works')): ?>

      <div class="loading">
        <div class="loading-animation">
          <p>WORKS</p>
        </div>
      </div>

    <?php elseif (is_category('news')): ?>

      <div class="loading">
        <div class="loading-animation">
          <p>NEWS</p>
        </div>
      </div>

    <?php elseif (is_category('blog')): ?>

      <div class="loading">
        <div class="loading-animation">
          <p>BLOG</p>
        </div>
      </div>

    <?php elseif (!is_single()): ?>

      <div class="loading">
        <div class="loading-animation">
          <p><?php the_title(); ?></p>
        </div>
      </div>

    <?php endif; ?>