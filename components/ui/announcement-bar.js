"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium relative z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1 text-center">
                    <p className="text-sm font-medium">
                        Free shipping on all orders over ₹499
                    </p>              <span className="ml-2">🌿</span>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary/80 rounded"
                    aria-label="Close announcement"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
