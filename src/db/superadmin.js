import { configEnv } from "../config/config.js";
import { Crypto } from "../helpers/bcrypt.js";
import { adminCollection } from "../model/admin.model.js";
import { handleError } from "../utils/error-res.js";

const cryptoPassword = new Crypto();
export const createSuperAdmin = async () => {
  try {
    const superAdmin = await adminCollection.findOne({ role: "superadmin" });
    if (!superAdmin) {
      const hashedPassword = await cryptoPassword.encrypt(
        configEnv.ADMIN_PASSWORD
      );
      await adminCollection.create({
        username: configEnv.ADMIN_USERNAME,
        email: configEnv.ADMIN_EMAIL,
        phone: configEnv.ADMIN_PHONE,
        hashedPassword: hashedPassword,
        role: "superadmin",
      });
      return console.log(`Superadmin created`);
    }
  } catch (error) {
    return console.log(`Error on creating superadmin ${error} object`);
  }
};
