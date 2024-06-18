import clsx from 'clsx';
import Button from '@/components/Button';
import Dim from '@/components/Dim';
import ReviewFilterModalLocation from './ReviewFilterModalLocation';
import ReviewFilterModalSorting from './ReviewFilterModalSorting';
import ReviewFilterModalTags from './ReviewFilterModalTags';

type ReviewFilterModalProps = {
  isOpen: boolean;
  closeHandler: () => void;
};

export default function ReviewFilterModal({
  isOpen,
  closeHandler,
}: ReviewFilterModalProps) {
  return (
    <>
      {isOpen && <Dim closeHandler={closeHandler} />}
      <div
        className={clsx(
          'fixed bottom-0 left-0 w-dvw p-8 pt-16 flex flex-col z-modal gap-16 bg-bg_white border border-stroke_grey rounded-t-3xl transition-transform duration-300',
          {
            ['translate-y-0']: isOpen,
            ['translate-y-full']: !isOpen,
          }
        )}>
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center text-16 font-bold">검색 필터</div>
          <Button
            variant="secondary"
            childrenType="iconOnly"
            iconName="close"
            size="xs"
            className="absolute right-16"
            onClick={closeHandler}
          />
        </div>
        <ReviewFilterModalSorting />
        <ReviewFilterModalTags />
        <ReviewFilterModalLocation />
      </div>
    </>
  );
}