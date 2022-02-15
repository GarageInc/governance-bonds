import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'hardhat';
import { ZERO_ADDRESS } from '../../test/constants';
import {
  OnxLocker,
  TAlphaToken,
  UniswapV2PairMock,
  VaultMock,
} from '../../typechain-types';

const func: DeployFunction = async (
  hre: HardhatRuntimeEnvironment,
): Promise<void> => {
  const { getNamedAccounts } = hre;

  const { deployer } = await getNamedAccounts();

  const onxLocker: OnxLocker = await ethers.getContract('OnxLocker', deployer);

  const onx: TAlphaToken = await ethers.getContract('TAlphaToken', deployer);
  const uniV2: UniswapV2PairMock = await ethers.getContract(
    'UniswapV2PairMock',
    deployer,
  );
  const vaultMock: VaultMock = await ethers.getContract('VaultMock', deployer);

  await onxLocker.setStakingToken(onx.address, ZERO_ADDRESS, {
    gasLimit: 2000000,
  });
  await onxLocker.setStakingToken(vaultMock.address, uniV2.address, {
    gasLimit: 2000000,
  });

  console.log('Configs set for locker!');
};

func.tags = ['LockerConfigs'];
func.skip = (env) => Promise.resolve(env.network.name === 'mainnet');

export default func;
