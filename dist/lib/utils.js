"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructMetadata = exports.formatPrice = exports.cn = void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
function cn(...inputs) {
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
function formatPrice(price, options = {}) {
    const { currency = 'USD', notation = 'compact' } = options;
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        notation,
        maximumFractionDigits: 2,
    }).format(numericPrice);
}
exports.formatPrice = formatPrice;
function constructMetadata({ title = 'DigitalPanda - the marketplace for digital assets', description = 'DigitalPanda is an open-source marketplace for high-quality digital goods.', image = '/thumbnail.png', icons = '/favicon.ico', noIndex = false, } = {}) {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
            creator: '@lalinhaDev',
        },
        icons,
        metadataBase: new URL('https://digitalhippo.up.railway.app'),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
exports.constructMetadata = constructMetadata;
