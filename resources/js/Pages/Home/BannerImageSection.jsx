import {image} from "@/helper.ts";

export default function BannerImageSection({imagePath, imageName = null}) {
    return (
        <section className="my-4 pt-4">
            <img className="m-auto" src={image(imagePath)} alt={imageName || 'images'}/>
        </section>
    );
}