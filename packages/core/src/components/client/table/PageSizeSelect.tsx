import {
  createListCollection,
  For,
  SelectContent,
  SelectRootProps,
} from '@chakra-ui/react';
import {
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '../../ui';

const AVAILABLE_PAGE_SIZES = [10, 20, 50, 100];

const collection = createListCollection({
  items: AVAILABLE_PAGE_SIZES.map((value) => ({
    value: value.toString(),
    label: value.toString(),
  })),
});

export const PageSizeSelect = (props: Omit<SelectRootProps, 'collection'>) => {
  return (
    <SelectRoot
      data-testid="pagination-page-size-select"
      collection={collection}
      {...props}
    >
      <SelectTrigger>
        <SelectValueText />
      </SelectTrigger>
      <SelectContent>
        <For each={collection.items}>
          {(item) => (
            <SelectItem key={item.value} item={item}>
              {item.label}
            </SelectItem>
          )}
        </For>
      </SelectContent>
    </SelectRoot>
  );
};
