import * as React from 'react';
import { AbstractCheckboxGroupProps } from '../checkbox/Group';
import { AbstractCheckboxProps } from '../checkbox/Checkbox';

export interface RadioGroupProps extends AbstractCheckboxGroupProps {
  defaultValue?: any;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  size?: 'large' | 'default' | 'small';
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  onClick?:React.MouseEventHandler<HTMLDivElement>;
}

export interface RadioGroupState {
  value: any;
}

export interface RadioGroupContext {
  radioGroup: {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    value: any;
    disabled: boolean;
    name: string;
    onClick:React.MouseEventHandler<HTMLDivElement>;
  };
}

export type RadioProps = AbstractCheckboxProps;
