<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'profile_photo_path',
        'email_verified_at',
        'phone_verified_at',
        'date_of_birth',
        'gender',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'phone_verified_at' => 'datetime',
            'date_of_birth' => 'date',
        ];
    }

    /**
     * Get the orders for the user.
     * 
     * @return HasMany
     */
    public function orders() : HasMany
    {
        return $this->hasMany(Order::class);
    }

    /**
     * Get the addresses for the user.
     * 
     * @return HasMany
     */
    public function addresses() : HasMany
    {
        return $this->hasMany(Address::class);
    }
}
