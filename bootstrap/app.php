<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
     // When user tries to access a route that does not exist
     $exceptions->render(function (NotFoundHttpException $e, Request $request) {
        if ($request->is('api/*')){
            return response()->json(['error' => 'Not Found.'], 404);
        }
    });

    // When a wrong method is used to access a route
    $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
        if ($request->is('api/*')){
            return response()->json(['error' => 'Method Not Allowed.'], 405);
        }
    });

    $exceptions->render(function (RouteNotFoundException $e, Request $request) {
        if ($request->is('api/*')){
            return response()->json(['error' => 'You are not authenticated.'], 401);
        }
    });


    // Too many requests
    $exceptions->render(function (HttpException $e, Request $request) {
        if ($request->is('api/*')){
            return response()->json(['error' => 'You have exceeded your Requests.'], 429);
        }
    });    })->create();
