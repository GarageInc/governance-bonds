import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers, upgrades } from 'hardhat';

const MULTISIG = '0xC447258CBc5a59774022Bf17060E2cF2Fe47030f';

const func: DeployFunction = async (
  hre: HardhatRuntimeEnvironment,
): Promise<void> => {
  const { deployments, getNamedAccounts } = hre;

  const { deployer } = await getNamedAccounts();

  const locker = await ethers.getContractFactory('OnxLocker');
  const proxy = await upgrades.deployProxy(locker, [deployer, MULTISIG], {
    kind: 'transparent',
  });

  await proxy.deployed();

  console.log('OnxLocker deployed to:', proxy.address);
};

func.tags = ['OnxLocker'];

export default func;
