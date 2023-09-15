require("dotenv").config();
const mailgen = require("mailgen");
const nodemailer = require("nodemailer");


const Transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const RegisterUser = async (user, userEmail, account,password) => {
  try {
    const MAILGEN = new mailgen({
      theme: "default",
      product: {
        name: "BaduTech",
        link: `${process.env.SITE_DOMAIN}`,
      },
    });

    const emailbody = {
      body: {
        name: user,
        intro:   `Welcome to ShoRite.Please your have been registered as an ${account}  `,
        action: {
          instructions:" Check Instruction below"  ,
          button: {
            color: "#22BC66", // Optional action button color
            text: `Use default  password  ${password} to login `,
          
          },
        },
        outro: "Need help  ?.",
      },
    };

    const msg = MAILGEN.generate(emailbody);
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Account verification",
      html: msg,
    };

    await Transporter.sendMail(message);
    return true;
  } catch (error) {

  }
};




const AdminNotification = async (user,userEmail,product,id,quantity,price) => {
  try {
    const MAILGEN = new mailgen({
      theme: "default",
      product: {
        name: "BaduTech",
        link: `${process.env.SITE_DOMAIN}`,
      },
    });

    const emailbody = {
      body: {
        name: user,
        intro:   `Quick Notice.Please Product named ${product} with ID ${id} will expiry in less than a month  `,
        action: {
          instructions:`Quantity: ${quantity}  Total cost :GH₵ ${price} . Check the link below for more detais`  ,
          button: {
            color: "#22BC66", // Optional action button color
            text: `CLICK TO SEE MORE`,
            link: `${process.env.SITE_DOMAIN}user/dashboard/notification`,
          
          },
        },
        outro: "Need help  ?.",
      },
    };

    const msg = MAILGEN.generate(emailbody);
    let message = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Attension Needed!",
      html: msg,
    };

    await Transporter.sendMail(message);
    return true;
  } catch (error) {
 
  }
};







const ResetPass = async (email_user, token) => {
  try {
    let mailG = new mailgen({
      theme: "default",
      product: {
        name: "BaduTec",
        link: `${process.env.EMAIL_MAIN_URL}`,
      },
    });

    const email = {
      body: {
        name: email_user,
        intro: "we  are sorry for the stress",
        action: {
          instructions: "Please click below to reset your password",
          button: {
            color: "#1a73e8",
            text: "password reset link",
            link: `${process.env.SITE_DOMAIN}account/passwordreset?t=${token}`,
          },
        },
        outra: "you need any help?",
      },
    };
    let emailbody = mailG.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: email_user,
      subject: "Password Reset",
      html: emailbody,
    };

    await Transporter.sendMail(message);
    return true;
  } catch (error) {
   
  }
};
/////////////////////////////////////////////
const Contactmail = async (emails, msg) => {
  try {
    let mailG = new Mailgen({
      theme: "default",
      product: {
        name: "ShopRite",
        link: `${process.env.EMAIL_MAIN_URL}`,
      },
    });

    const email = {
      body: {
        intro: ["New message", `Email:${emails}`],
        outro: [`${msg}`],
      },
    };
    let emailbody = mailG.generate(email);
    let message = {
      from: process.env.EMAIL,
      to: `${emails}`,
      subject: "Contact message",
      html: emailbody,
    };
    await transporter.sendMail(message);
    return true;
  } catch (error) {
    if (error) {
    }
  }
};

/////////send email
const sendmail = async (contact) => {
  try {
    let mailG = new Mailgen({
      theme: "default",
      product: {
        name: "My Id finder",
        link: `${process.env.EMAIL_MAIN_URL}`,
      },
    });

    const email = {
      body: {
        intro: [
          `Email:${contact.email}`,
          `firstname:${contact.firstname}`,
          `lastname:${contact.lastname}`,
        ],
        outro: [`${contact.message}`],
      },
    };
    let emailbody = mailG.generate(email);
    let message = {
      from: `${process.env.EMAIL}`,
      to: `${contact.email}`,
      subject: "Contact message",
      html: emailbody,
    };
    await transporter.sendMail(message);
    return true;
  } catch (error) {
    if (error) {
    
    }
  }
};


module.exports = {
  RegisterUser,
  AdminNotification,
  ResetPass
};
