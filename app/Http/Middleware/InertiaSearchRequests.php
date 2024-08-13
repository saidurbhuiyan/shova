<?php

namespace App\Http\Middleware;

use App\Models\Category;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Middleware;
use Symfony\Component\HttpFoundation\Response;

class InertiaSearchRequests extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Inertia::share([
            'categories' => Cache::remember('categories', 60, static fn() =>Category::orderBy('id', 'desc')->get()),
        ]);

        return $next($request);
    }
}
