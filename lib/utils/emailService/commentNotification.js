const verificationMailTemplate = (url, commenter, recipient, title, comment, user) => {
  const messagetobesent = () => {
    if (user) {
      const response = {
        subject: 'Hey, A Comment was made on an article you like',
        message: `A comment was made on the article : <strong>${title}<strong></strong>`
      };
      return response;
    }
    const response = {
      subject: 'Hey, There is a new comment on your article.',
      message: `A comment was made by ${commenter} on your article : <strong>${title}<strong></strong>`

    };
    return response;
  };
  const message = `<!DOCTYPE html>
    <html>
    <head>
    
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Email Verification</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
      /**
       * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
       */
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
        }
    
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
        }
      }
    
      /**
       * Avoid browser level font resizing.
       * 1. Windows Mobile
       * 2. iOS / OSX
       */
      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
      }
    
      /**
       * Remove extra space added to tables and cells in Outlook.
       */
      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
    
      /**
       * Better fluid images in Internet Explorer.
       */
      img {
        -ms-interpolation-mode: bicubic;
      }
    
      /**
       * Remove blue links for iOS devices.
       */
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }
    
      /**
       * Fix centering issues in Android 4.4.
       */
      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
    
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
    
      /**
       * Collapse table borders to avoid space between cells.
       */
      table {
        border-collapse: collapse !important;
      }
    
      a {
        color: #1a82e2;
      }
    
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
        width: 100px;
      }
      </style>
    
    </head>
    <body style="background-color: #e9ecef;">
    
      <!-- start preheader -->
      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
      ${messagetobesent().subject}
      </div>
      <!-- end preheader -->
    
      <!-- start body -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
    
        <!-- start logo -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px;">
                  <a href="https://krypton-ah-stage.herokuapp.com" target="_blank" style="display: inline-block;">
                    <img src='https://res.cloudinary.com/ah-krypton/image/upload/v1549310966/logo.png' alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                  </a>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end logo -->
    
        <!-- start hero -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Hi ${recipient}!</h1>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end hero -->
    
        <!-- start copy block -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
    
              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 2px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0; padding: 20px; padding-bottom: 0px; border-top-style: none;">${messagetobesent().message}</p>
                </td>
              </tr>
              <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 14px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <p align="left" background-color: #ccd6e8;"><strong>Comment<strong></p>
                <p style="padding: 14px; line-height: 24px; color:#1f3379; border-top-style: solid; border-top-width: 2px;"><strong>${comment}<strong></p>
              </td>
            </tr>
              <!-- end copy -->
    
              <!-- start button -->
              <tr>
                <td align="left" bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                              <a href="${url}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">View other comments on this article</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- end button -->
    
            </table>
          </td>
        </tr>
        <!-- end copy block -->
    
      </table>
      <!-- end body -->
    
    </body>
    </html>`;
  return message;
};
module.exports = verificationMailTemplate;
