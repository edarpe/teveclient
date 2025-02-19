"use client"
import { msalConfig } from "../auth/authConfig";
import { AccountInfo, EventMessage, EventType, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const msalInstance = new PublicClientApplication(msalConfig);

    if(!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
        msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
    }

    msalInstance.addEventCallback((event: EventMessage) => {
        if(event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const account = event.payload as AccountInfo;
            msalInstance.setActiveAccount(account);
        }
    });

    return (
        <MsalProvider instance={msalInstance}>
            {children}
        </MsalProvider>
    );
}

export function useAuthProvider() {
    return { AuthProvider };
}