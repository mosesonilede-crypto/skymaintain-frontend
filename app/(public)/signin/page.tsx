/* eslint-disable @next/next/no-img-element */
/**
 * @skymain.design
 * fileKey: qz3ERP8jfbTpTHQrdPSawI
 * nodeId: 1:566
 * specHash: sha256:9429a994ddb4dc42279c29bca1bff1286f48b34c987fbfe4d98c3491123dfaf1
 */
import PreLoginPage from "../pre-login/page";
import SignInOverlay from "./SignInOverlay";

export default function SignInPage() {
    return (
        <div className="relative">
            <PreLoginPage />
            <SignInOverlay />
        </div>
    );
}
