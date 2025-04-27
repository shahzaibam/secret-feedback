import React from "react";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <div>
      <h1>Welcome to Secret Feedback, {username}!</h1>
      <p>
        Your verification code is: <strong>{otp}</strong>
      </p>
      <p>This code will expire in 10 minutes.</p>
    </div>
  );
}
