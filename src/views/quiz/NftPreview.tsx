import { Wand } from 'lucide-react';

import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { ReportSuccessfulMintDto } from '@/api/models/report-successful-mint.dto';
import { GenerationActionResponse } from '@/api/hooks/useGenerateImage';

type Props = {
  open: boolean;
  isLoading: boolean;
  mintPrice: number;
  mintData?: ReportSuccessfulMintDto;
  generationAction: GenerationActionResponse;
  onChange: (open: boolean) => void;
};

const NftPreview = (props: Props) => {
  const { isLoading, open, onChange, mintPrice, mintData, generationAction } =
    props;

  return (
    <Drawer open={open} onOpenChange={onChange}>
      <DrawerContent>
        <div className='flex h-full w-full flex-col items-center justify-center py-[112px]'>
          {isLoading && (
            <>
              <Wand width={60} height={60} color='#fff' />

              <div className='max-w-[805px] pt-10 text-center text-5xl font-extrabold leading-tight'>
                We are preparing your NFT.
                <br />
                Please do not close this page.
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NftPreview;
