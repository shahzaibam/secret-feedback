import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, username: string, code: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Secret Feedback <onboarding@resend.dev>',
            to: email,
            subject: 'Verify your email',
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 25px;
        }
        .logo {
            color: #4f46e5;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        h1 {
            color: #4f46e5;
            font-size: 22px;
            margin-bottom: 20px;
        }
        .code-container {
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
            margin: 20px 0;
            font-size: 24px;
            font-weight: bold;
            color: #4f46e5;
            letter-spacing: 2px;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #6b7280;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            padding-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4f46e5;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Secret Feedback</div>
            <h1>Verify your email address</h1>
        </div>
        
        <p>Hello ${username},</p>
        
        <p>Thank you for signing up! To complete your registration, please use the following verification code:</p>
        
        <div class="code-container">${code}</div>
        
        <p>This code will expire in <strong>1 hour</strong>. If you didn't request this code, you can safely ignore this email.</p>
        
        <div class="footer">
            <p>© ${new Date().getFullYear()} Secret Feedback. All rights reserved.</p>
            <p>If you need any help, please contact our support team.</p>
        </div>
    </div>
</body>
</html>
      `,
        });

        if (error) {
            console.error('Resend error:', error);
            return;
        }

        console.log('Email sent:', data);
    } catch (err) {
        console.error('Email send failed:', err);
    }
}