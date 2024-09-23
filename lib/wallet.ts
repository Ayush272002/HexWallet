import { WalletTypes } from '@/interfaces/WalletTypes';
import { toast } from 'sonner';

export interface DeleteWalletProps {
  index: number;
  wallets: WalletTypes[];
  pathTypes: string[];
  visiblePrivateKeys: boolean[];
  visiblePhrases: boolean[];
  setWallets: (value: WalletTypes[]) => void;
  setPathTypes: (value: string[]) => void;
  setVisiblePrivateKeys: (value: boolean[]) => void;
  setVisiblePhrases: (value: boolean[]) => void;
}

export const deleteWallet = ({
  index,
  wallets,
  pathTypes,
  visiblePrivateKeys,
  visiblePhrases,
  setWallets,
  setPathTypes,
  setVisiblePrivateKeys,
  setVisiblePhrases,
}: DeleteWalletProps) => {
  const updatedWallets = wallets.filter((_, i) => i !== index);
  const updatedPathTypes = pathTypes.filter((_, i) => i !== index);

  setWallets(updatedWallets);
  setPathTypes(updatedPathTypes);
  localStorage.setItem('wallets', JSON.stringify(updatedWallets));
  localStorage.setItem('pathTypes', JSON.stringify(updatedPathTypes));
  setVisiblePrivateKeys(visiblePrivateKeys.filter((_, i) => i !== index));
  setVisiblePhrases(visiblePhrases.filter((_, i) => i !== index));
  toast('Wallet deleted successfully');
};
