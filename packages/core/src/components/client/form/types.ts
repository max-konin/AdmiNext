import { ExtendableAutoFormProps } from '@autoform/react';
import { FieldValues } from 'react-hook-form';

export type AutoFormProps<T extends FieldValues> = ExtendableAutoFormProps<T>;
