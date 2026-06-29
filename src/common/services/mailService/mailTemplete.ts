
export const emailTemplete = function ({ otp, userName }: { otp: number; userName?: string }) {
  
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>E-commerce</title>
  <style>
    /* Reset styles */
    body,
    table,
    td,
    a {
      text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }

    table {
      border-collapse: collapse !important;
    }

    body {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #f4f6f9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    /* Client-specific overrides */
    img[-webkit-cache-control-value] {
      display: none !important;
    }

    /* Interactive states & hover effect micro-animations */
    .otp-code {
      letter-spacing: 6px;
      font-weight: 800;
      color: #4f46e5 !important;
      background-color: #f5f3ff;
      border: 1px dashed #c084fc;
      padding: 16px 24px;
      border-radius: 12px;
      display: inline-block;
    }
  </style>
</head>

<body style="background-color: #f4f6f9; padding: 20px 0;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
          style="max-width: 500px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">

          <!-- Header Gradient Accent -->
          <tr>
            <td
              style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 40px 30px; text-align: center;">
              <!-- App Logo Icon -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 15px auto;">
                <tr>
                  <td
                    style="background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; padding: 12px; display: inline-block;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                      style="display: block;">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12 6V12L16 14" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                  </td>
                </tr>
              </table>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Confirm
                Your Identity</h1>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 30px; background-color: #ffffff;">
              <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 24px; color: #1f2937; font-weight: 500;">
              Hello ${userName}
              </p>
              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #4b5563;">
                Thank you for choosing <strong>{{E-commerce}}</strong>. To complete your verification, please use the
                following one-time password (OTP) code.
              </p>

              <!-- OTP Code Display -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                style="margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <div
                      style="font-family: 'Courier New', Courier, monospace, sans-serif; font-size: 32px; letter-spacing: 6px; font-weight: 800; color: #4f46e5; background-color: #f5f3ff; border: 1px dashed #c084fc; padding: 16px 24px; border-radius: 12px; display: inline-block;">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Expire and Security Warning -->
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                style="margin-bottom: 24px; background-color: #fef8f2; border-left: 4px solid #f97316; border-radius: 4px;">
                <tr>
                  <td style="padding: 12px 16px;">
                    <p style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #9a3412;">
                      Code Expiration
                    </p>
                    <p style="margin: 0; font-size: 13px; line-height: 18px; color: #c2410c;">
                      This code is valid for the next <strong>{{expireMinutes}} minutes</strong>. Please do not share
                      this OTP with anyone, including our support agents.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 14px; line-height: 20px; color: #6b7280;">
                If you did not request this verification, you can safely ignore this email. Someone may have entered
                your email address by mistake.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="padding: 24px 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #9ca3af;">
                &copy; {{currentYear}} {{appName}}. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                This is an automated email, please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>

</html>`
}

