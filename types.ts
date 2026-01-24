import React from 'react';

export type ViewState = 'HOME' | 'SIGNUP' | 'PAYMENT' | 'SUCCESS' | 'DASHBOARD';

export interface UserData {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  isActivated?: boolean; // New field to track activation status
}

export interface FeatureProps {
  title: string;
  description: string;
  price?: string;
  icon?: React.ReactNode;
  image?: string;
  reverse?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}