<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $isGuest = fake()->boolean();
        return [
            'user_id' => $isGuest ? null : User::all()->random()->id,
            'address' => fake()->address(),
            'city' => fake()->city(),
            'sub_district' => fake()->city(),
            'contact_number' => fake()->phoneNumber(),
            'is_primary' => !$isGuest && fake()->boolean(),
            'is_guest' => $isGuest,
            'guest_name' => $isGuest ? fake()->name() : null,
        ];
    }
}
