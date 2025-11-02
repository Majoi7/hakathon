<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAdminPermission
{
    public function handle(Request $request, Closure $next, $permission)
    {
        $admin = $request->user('admin');

        if (!$admin || !$admin->hasPermission($permission)) {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        return $next($request);
    }
}
