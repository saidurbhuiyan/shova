import Navbar from "@/Includes/Navbar";
import Footer from "@/Includes/Footer.jsx";

export default function Default({ auth, children }) {
    return (
        <div className="min-h-screen max-w-[1920px] bg-white">
            <Navbar auth={auth} />
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12">
                {children}

                <Footer/>
            </div>

        </div>
    );
}
