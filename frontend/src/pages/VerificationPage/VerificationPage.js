import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import "./VerificationPage.css";

const VerificationPage = () => {
    const { email, code } = useParams();
    const [status, setStatus] = useState("Loading");
    const [message, setMessage] = useState("Veryfing your account...");

        useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/auth/verifyuser", {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, code }),
                    });

                const text = await response.text();
                if (response.ok) {
                    setStatus('Success!');
                    setMessage("Your account has been successfully verified! You can now log in.");
                }
                else {
                    setStatus('Failure...');
                    if (text) setMessage(text);
                    else setMessage("Verification failed. The link may be expired or invalid.");
                }
            } catch (error) {
                setStatus('Failure...');
                setMessage("Verification failed. The link may be expired or invalid.");
            }
        };
        verifyEmail();
    }, [email, code]);

  return (
    <div>
        <NavBar showButtons={false} />
    <div className="verification-page-container">
            <div className="message-background">
                    <div className="message-container">
                    <div className="verification-message">
                        <div className="result-header">{status}</div>
                        {status === 'Success!' ? (
                            <h2>{message}</h2>
                        ) : (
                            <h2>{message}</h2>
                        )}
                    </div>  

                    <div className="login-link">
                            <a className="link-itself" href="/login">Go to our login page</a>
                    </div>
                    </div>
            </div>
        </div>
    </div>
  );
};

export default VerificationPage;
