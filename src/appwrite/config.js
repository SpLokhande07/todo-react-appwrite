import conf from "../conf/conf";

import { Client, Account, ID, Databases, Query } from "appwrite";

export class Service {
  client = new Client();
  account;
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
    this.collection = new Query(this.client);
    this.bucket = new Query(this.client);
  }

  async createPost({ title, slug, content, featuredMusic, status, userId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredMusic, status, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error ", error);
    }
  }

  async updatePost(slug, { title, content, featuredMusic, status, userId }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredMusic, status, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error ", error);
    }
  }

  async deletePost(slug) {
    try {
      return await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error ", error);
      return false;
    }
  }

  async getSinglePost(slug) {
    try {
      const post = await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return post;
    } catch (error) {
      console.log("Appwrite service :: getSinglePost :: error ", error);
      return false;
    }
  }

  async getPostList(query = [Query.equal("status", "active")]) {
    try {
      const [post] = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        query
      );
      return post;
    } catch (error) {
      console.log("Appwrite service :: getPostList :: error ", error);
      return false;
    }
  }

  // file upload

  async uploadFile(file, filename) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        filename
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    try {
      const file = this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
      return file;
    } catch (error) {
      console.log("Appwrite service :: getFilePreview :: error ", error);
      return false;
    }
  }
}

const appwriteService = new Service();

export default appwriteService;
