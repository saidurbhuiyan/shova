<?php

namespace App\Traits;

use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

/**
 * Trait HasImage
 * @package App\Traits
 */

trait HasImage
{

    /**
     * Sets the  image from a URL.
     * @throws FileNotFoundException
     */
    public function setImageFromUrl(string $url): void
    {
        $name = pathinfo($url)['basename'];
        file_put_contents($file = '/tmp/' . $name, file_get_contents($url));
        $this->updateImage(new UploadedFile($file, $name));
    }

    /**
     * Update the  image.
     * @throws FileNotFoundException
     */
    public function updateImage(UploadedFile $image, string $storagePath = 'images/products'): void
    {
        $manager = Image::read($image->get());

        match ($image->extension()) {
            'gif' => $manager->toGif(),
            'png' => $manager->toPng(90),
            default => $manager->toJpeg(90),
        };

        $manager->save($image->getPathname());


        // Upload image publicly
        tap($this->image_path, function ($previous) use ($image, $storagePath): void {
            $this->forceFill([
                'image_path' => $image->storePublicly(
                    $storagePath,
                    ['disk' => $this->ImageDisk()]
                ),
            ])->save();

            if ($previous) {
                Storage::disk($this->ImageDisk())->delete($previous);
            }
        });
    }

    /**
     * Delete the  image.
     */
    public function deleteImage($isDeleteAble = false): void
    {
        if (is_null($this->image_path)) {
            return;
        }

        Storage::disk($this->ImageDisk())->delete($this->image_path);

        if (!$isDeleteAble) {
            $this->forceFill([
                'image_path' => null,
            ])->save();

            return;
        }

        $this->delete();
    }

    /**
     * Get the URL to the  image.
     *
     * @return Attribute
     */
    public function ImageUrl(): Attribute
    {
        return Attribute::get(function () {
            return $this->image_path
                ? Storage::disk($this->ImageDisk())->url($this->image_path)
                : null;
        });
    }

    /**
     * Get the disk that  images should be stored on.
     *
     * @return string
     */
    protected function ImageDisk(): string
    {
        return isset($_ENV['VAPOR_ARTIFACT_NAME']) ? 's3' :  'public';
    }
}
