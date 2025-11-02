<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Http\Request;
use App\Models\TeacherProfile;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_students' => User::where('role', 'student')->count(),
            'total_teachers' => User::where('role', 'teacher')->count(),
            'pending_teachers' => TeacherProfile::where('verification_status', 'pending')->count(),
            'total_admins' => Admin::count(),
            'recent_signups' => User::where('created_at', '>=', now()->subDays(7))->count(),
            'active_sessions' => 0,
        ];

        $recentActivities = [];

        return response()->json([
            'stats' => $stats,
            'recent_activities' => $recentActivities,
            'message' => 'Dashboard admin avec données réelles'
        ]);
    }

    public function getStats()
    {
        return response()->json([
            'total_students' => User::where('role', 'student')->count(),
            'total_teachers' => User::where('role', 'teacher')->count(),
            'pending_verifications' => 0,
            'total_admins' => Admin::count(),
        ]);
    }

    public function getUsers(Request $request)
    {
        // Version simple sans teacher_profiles
        $users = User::when($request->role, function ($query, $role) {
            return $query->where('role', $role);
        })
            ->when($request->search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->select('id', 'name', 'email', 'role', 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($users);
    }

    public function getPendingTeachers()
    {
        $teachers = TeacherProfile::with(['user' => function ($query) {
            $query->select('id', 'name', 'email');
        }])
            ->where('verification_status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($teachers);
    }

    public function getAdmins()
    {
        $admins = Admin::select('id', 'name', 'email', 'role', 'is_active', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($admins);
    }

    public function createAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:super_admin,admin,moderator',
        ]);

        $admin = Admin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'permissions' => $request->permissions,
        ]);

        return response()->json([
            'message' => 'Administrateur créé avec succès',
            'admin' => $admin
        ]);
    }

    public function getActivities()
    {
        // Liste vide pour l'instant
        return response()->json([]);
    }

    // Les autres méthodes (deleteUser, verifyTeacher, etc.) peuvent rester simples
    public function deleteUser(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé avec succès']);
    }
}
