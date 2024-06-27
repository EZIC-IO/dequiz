import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GenerationAction } from '@/api/models/generation.dto';
import IconExplorer from '@/components/icons/IconExplorer';
import IconOpenSea from '@/components/icons/IconOpenSea';

type Props = {
  open: boolean;
  generationAction: GenerationAction;
  onOpenChange: (open: boolean) => void;
};

const MintResult = (props: Props) => {
  const { open, onOpenChange, generationAction } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[616px]'>
        <DialogHeader className='mb-8'>
          <DialogTitle className='text-center text-xl'>Minted</DialogTitle>
        </DialogHeader>

        <div className='flex justify-center'>
          <img
            style={{ width: 299, height: 311 }}
            alt='Nft'
            src={generationAction.imageGatewayIPFS}
          />
        </div>

        {(generationAction?.txBlockExplorerUrl ||
          generationAction?.openSeaUrl) && (
          <div>
            <div className='my-10 text-center'>View On</div>

            <div className='flex justify-center gap-6'>
              {generationAction?.txBlockExplorerUrl && (
                <Link
                  target='_blank'
                  href={generationAction.txBlockExplorerUrl}
                >
                  <Button variant='secondary' className='flex gap-2'>
                    <IconExplorer />
                    Transaction
                  </Button>
                </Link>
              )}

              {generationAction?.openSeaUrl && (
                <Link target='_blank' href={generationAction.openSeaUrl}>
                  <Button variant='secondary' className='flex gap-2'>
                    <IconOpenSea />
                    OpenSea
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MintResult;
