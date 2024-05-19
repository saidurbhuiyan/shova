import Navbar from "@/Includes/Navbar";

export default function Default({ auth, children }) {
    return (
        <div className="min-h-screen max-w-[1920px] bg-gray-100">
            <Navbar auth={auth} />
            <div className="max-w-[1440px] mx-auto px-4 lg:px-8 xl:px-12">
                {children}
            </div>

        </div>
    );
}
