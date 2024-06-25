import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GenerationAction } from '@/api/models/generation.dto';

type Props = {
  open: boolean;
  image: string;
  generationAction?: GenerationAction;
  onOpenChange: (open: boolean) => void;
};

const MintResult = (props: Props) => {
  const { open, onOpenChange, image, generationAction } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[616px]'>
        <DialogHeader className='mb-8'>
          <DialogTitle className='text-center text-xl'>Minted</DialogTitle>
        </DialogHeader>

        <div className='flex justify-center'>
          <img style={{ width: 299, height: 311 }} alt='Nft' src={image} />
        </div>

        {generationAction && (
          <div>
            <div className='my-10 text-center'>View On</div>

            <div className='flex justify-center gap-6'>
              {generationAction?.txBlockExplorerUrl && (
                <Link href={generationAction.txBlockExplorerUrl}>
                  <Button variant='secondary'>Explorer</Button>
                </Link>
              )}

              {generationAction?.openSeaUrl && (
                <Link href={generationAction.openSeaUrl}>
                  <Button variant='secondary'>OpenSea</Button>
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
