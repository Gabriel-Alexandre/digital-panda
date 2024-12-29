"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideUser = void 0;
const getServerSideUser = async (cookies) => {
    var _a;
    const token = (_a = cookies.get('payload-token')) === null || _a === void 0 ? void 0 : _a.value;
    const meRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
        headers: {
            Authorization: `JWT ${token}`,
        },
    });
    const { user } = (await meRes.json());
    return { user };
};
exports.getServerSideUser = getServerSideUser;
