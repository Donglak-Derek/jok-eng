import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Jok-Eng: Learn English with Videos",
        short_name: "Jok-Eng",
        description: "Learn everyday English expressions through short vertical videos and interactive scenarios.",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        orientation: "portrait",
        categories: ["education", "productivity"],
        shortcuts: [
            {
                name: "Videos Feed",
                short_name: "Videos",
                url: "/videos",
            },
            {
                name: "My Profile",
                short_name: "Profile",
                url: "/profile",
            }
        ],
        icons: [
            {
                src: "/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any"
            }
        ]
    };
}
