import { MongoDataSource } from 'apollo-datasource-mongodb';
import { UserInterFace } from '../models';
import { Types } from 'mongoose';
import { signup, login } from '../server/services';
import { Request } from 'express';

export class User extends MongoDataSource<UserInterFace> {
  users() {
    return this.model.find();
  }
  getUser(userId: Types.ObjectId | string) {
    return this.findOneById(userId);
  }

  signup(email: String, username: String, password: String, req: Request) {
    return signup({ email, username, password, req });
  }

  login(email: String, password: String, req: Request) {
    return login({ email, password, req });
  }

  delete(id: Types.ObjectId) {
    this.model.findByIdAndDelete(id).exec();
  }

  update(id: Types.ObjectId, username: String) {
    this.model.findByIdAndUpdate(id, { username: username }).exec();
  }
}
