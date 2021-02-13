import "dotenv/config";
import { createTransport } from "nodemailer";
import hbs from "nodemailer-handlebars";
import path from "path";
import config from "config";
import { deleteFile } from "@shared/util/upload";

import logger from "./logger";

type File = {
  filename: string;
  path: string;
};

enum Template {
  contact,
  budget,
  provider
}

type Contact = {
  name: string;
  phoneNumber?: string;
  mobileNumber: string;
  email: string;
};

type Budget = {
  m2: string;
  typeOfWork: string;
  productOfInterest: string;
  vao: string;
};

type Provider = {
  companyName: string;
  companyPhoneNumber: string;
  companyCnpj: string;
  typeOfService: string;
};

interface ISendEmail {
  subject: string;
  template: Template;
  message: string;
  contact: Contact;
  files?: File[];
  budget?: Budget;
  provider?: Provider;
}

const sendEmail = ({
  subject,
  message,
  files,
  contact,
  template,
  budget,
  provider
}: ISendEmail): void => {
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: config.get("App.email.port"),
    secure: false, //SSL/TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  /** check template */
  let tpl: string;
  if (template === 0) {
    tpl = "contact";
  } else if (template === 1) {
    tpl = "budget";
  } else {
    tpl = "provider";
  }

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "./../views"),
        defaultLayout: false
      },
      viewPath: path.resolve(__dirname, "./../views"),
      extName: ".handlebars"
    })
  );

  const mailOptions = {
    to: `${config.get("App.email.admin")}`,
    from: `${config.get("App.email.admin")}`,
    cc: `${config.get("App.email.cc")}`,
    subject,
    template: tpl,
    context: {
      message,
      contact,
      budget,
      provider
    },
    attachments: files
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) throw new Error(`${error}`);

    /** checks for temporary files and removes ... ... */
    files?.map(item => {
      deleteFile(item.path);
    });

    logger.info("Email sent: " + info.response);
  });
};

export { sendEmail };
