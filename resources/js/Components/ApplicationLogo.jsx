import { image } from "../helper.ts";
import {Link} from "@inertiajs/react";

export default function ApplicationLogo(props) {
    return (
        <Link href={route('home')}>
            <img {...props} src={image('logo.png')} alt="logo"/>
        </Link>

);
}
