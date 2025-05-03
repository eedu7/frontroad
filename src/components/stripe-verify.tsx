import { Button, Link } from "@payloadcms/ui";
import React from "react";

export default function StripeVerify() {
    return (
        <Link href="/stripe-verify">
            <Button>Verify account</Button>
        </Link>
    );
}
