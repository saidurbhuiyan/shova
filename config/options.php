<?php

/*
 * Other configuration options
 */
return [

    /*
     * authenticate by
     * email, phone_number, username
     */

    'username' => env('USERNAME', 'email'),

     /*
     * user roles name
     */
    'user_roles' => [
        'admin',
        'user',
    ],

    /*
     *  Google Analytics
     */
    'google_analytics_measurement_id' => env('GOGGLE_ANALYTICS_MEASUREMENT_ID'),

    /*
     * other email.
     */
    'admin_email'             => env('ADMIN_EMAIL', 'admin@example.com'),
    'support_email'           => env('SUPPORT_EMAIL', 'support@example.com'),
    /*
     * social link.
     */
    'twitter_social_link'     => env('TWITTER_SOCIAL_LINK'),
    'telegram_social_link'    => env('TELEGRAM_SOCIAL_LINK'),

    // DEFAULT CURRENCY
    'currency_name' => env('CURRENCY_NAME', 'USD'),


];
