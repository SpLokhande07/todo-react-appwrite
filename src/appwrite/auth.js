import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ name, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // You can either return user object after successfully registering account
        /////////////// return userAccount;
        // OR
        // You can log user directly
        this.login({ email, password });
      } else {
        throw new Error("Error creating account");
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error ", error);
    }
  }

  async login({ email, password }) {
    try {
      const user = await this.account.createEmailSession(email, password);
      if (user) {
        this.account.set(user.accessToken);
      } else {
        throw new Error("Error logging in");
      }
    } catch (error) {
      console.log("Appwrite service :: login :: error ", error);
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);
    }
  }

  async getCurrentUser() {
    try {
      var user = await this.account.get();
      return user;
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error ", error);
      return null;
    }
  }
}

const authService = new AuthService();

export default new AuthService();
