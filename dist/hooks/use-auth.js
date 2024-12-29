"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = void 0;
const navigation_1 = require("next/navigation");
const sonner_1 = require("sonner");
const useAuth = () => {
    const router = (0, navigation_1.useRouter)();
    const signOut = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!res.ok)
                throw new Error();
            sonner_1.toast.success('Signed out successfully');
            router.push('/sign-in');
            router.refresh();
        }
        catch (err) {
            sonner_1.toast.error("Couldn't sign out, please try again.");
        }
    };
    return { signOut };
};
exports.useAuth = useAuth;
