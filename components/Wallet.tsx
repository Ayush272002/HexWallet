import { WalletTypes } from '@/interfaces/WalletTypes';
import { deleteWallet } from '@/lib/wallet';
import { useState } from 'react';

const Wallet = () => {
  const [pathTypes, setPathTypes] = useState<string[]>([]);
  const [wallets, setWallets] = useState<WalletTypes[]>([]);
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<boolean[]>([]);
  const [visiblePhrases, setVisiblePhrases] = useState<boolean[]>([]);

  const handleDeleteWallet = (index: number) => {
    deleteWallet({
      index,
      wallets,
      pathTypes,
      visiblePrivateKeys,
      visiblePhrases,
      setWallets,
      setPathTypes,
      setVisiblePrivateKeys,
      setVisiblePhrases,
    });
  };

  handleDeleteWallet(0);

  return <div>Wallet</div>;
};

export default Wallet;
