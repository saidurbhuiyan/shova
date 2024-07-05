<?php

namespace App\Services;

use Hashids\Hashids;

/**
 * Class HashIdService
 * @package App\Services
 */
class HashIdService
{

    /**
     * @param $hashIds
     */
    public function __construct(protected $hashIds = null)
    {
        if (!$this->hashIds instanceof Hashids) {
            $this->hashIds = new Hashids(config('app.name') . ' hashed id', 26);
        }
    }

    /**
     * @param int $id
     * @return string
     */
    public function encode(int $id): string
    {
        return $this->hashIds->encode($id);
    }

    /**
     * @param mixed $hashId
     * @return string|int|float
     */
    public function decode(mixed $hashId): string|int|float
    {
        if (!is_numeric($hashId)) {
            return $this->hashIds->decode($hashId)[0];
        }

        return $hashId;
    }

}