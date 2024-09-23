import {FileModel} from "./file-handle.model";

export interface Animal {
  name: '',
  age: undefined,
  size: undefined,
  gender: undefined,
  health: undefined,
  description: undefined,
  type: undefined,
  color:undefined,
  goodInHome: undefined,
  coatLength: undefined,
  animalCenter: undefined,
  author: undefined,
  breedDetails: undefined,
  animalImages: FileModel[],

  isFullyVaccinated: boolean,
  vaccinationDetails: undefined,
  isTrained: boolean,
  trainedDetails: undefined,
  hasSpecialNeeds: boolean,
  specialNeedsDetails: undefined,
  sheds: boolean,
  maintenanceCosts: undefined,
  preferredFoodDescription: undefined,
  hasPreviousOwners: boolean,
}
