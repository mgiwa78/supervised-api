import mongoose, { Document as Doc, Model } from "mongoose";
import { TUser } from "./user";
import { TProject } from "./project";

export interface TState {
  title: string;
  color: string;
  position: string;
}

export interface StateDoc extends Doc, TState {}

interface StateModel extends Model<StateDoc> {
  build(attrs: TState): StateDoc;
}

const StateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  position: {
    type: String
  }
});

const State: StateModel = (mongoose.models?.State ||
  mongoose.model<StateDoc, StateModel>("State", StateSchema)) as StateModel;

export { State };
