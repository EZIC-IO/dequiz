import { RPGVocation } from './gen-image.dto';

export interface NFTPropertyAttribute {
  trait_type: string;
  value: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: NFTPropertyAttribute[];
}

export enum GenerationActionStatus {
  PROCESSING = 'PROCESSING',
  GENERATED = 'GENERATED',
  PUBLISHED = 'PUBLISHED',
  MINTED = 'MINTED',
}

export interface GenerationAction {
  identityHash: string;
  status: GenerationActionStatus;
  vocation: RPGVocation;
  imageUrl: string;
  imageBareIPFS: string;
  imageGatewayIPFS: string;
  metadataBareIPFS: string;
  metadata: NFTMetadata;
  mintTx: string;
  txBlockExplorerUrl: string;
  openSeaUrl: string;
  createdAt: number;
  epochId: string;
  _id: string;
}
