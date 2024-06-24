import { GenerationAction } from './generation.dto';

export interface ReportSuccessfulMintDto {
  genActionId: string;
  mintTx: string;
  nftTokenId: number;
}

export type UpdatedFields = Pick<
  GenerationAction,
  'status' | 'mintTx' | 'openSeaUrl' | 'txBlockExplorerUrl'
>;
