import { WalletTypes } from '@/interfaces/WalletTypes';
import { mnemonicToSeedSync } from 'bip39';
import { toast } from 'sonner';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { ethers } from 'ethers';

interface DeleteWalletProps {
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

interface generateWalletFromMnemonicProps {
  pathType: string;
  mnemonic: string;
  accountIndex: number;
}

export const generateWalletFromMnemonic = ({
  pathType,
  mnemonic,
  accountIndex,
}: generateWalletFromMnemonicProps): WalletTypes | null => {
  try {
    const seedBuffer = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/${pathType}'/0'/${accountIndex}'`;
    const { key: derivedSeed } = derivePath(path, seedBuffer.toString('hex'));

    let publicKeyEncoded: string;
    let privateKeyEncoded: string;

    if (pathType === '501') {
      // solana
      const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
      const keyPair = Keypair.fromSecretKey(secretKey);

      privateKeyEncoded = bs58.encode(secretKey);
      publicKeyEncoded = keyPair.publicKey.toBase58();
    } else if (pathType === '60') {
      // ethereum
      const privateKey = Buffer.from(derivedSeed).toString('hex');
      privateKeyEncoded = privateKey;

      const wallet = new ethers.Wallet(privateKey);
      publicKeyEncoded = wallet.address;
    } else {
      toast.error('Invalid path type');
      return null;
    }

    return {
      publicKey: publicKeyEncoded,
      privateKey: privateKeyEncoded,
      mnemonic,
      path,
    };
  } catch (error) {
    toast.error('Failed to generate wallet. Please try again.');
    return null;
  }
};
