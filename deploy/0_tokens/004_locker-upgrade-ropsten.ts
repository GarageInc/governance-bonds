import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers, upgrades } from 'hardhat';

const func: DeployFunction = async (
  hre: HardhatRuntimeEnvironment,
): Promise<void> => {
  const locker = await ethers.getContractFactory('OnxLocker');
  const proxy = await upgrades.upgradeProxy(
    '0xAB153f1b8E9279B3754832F5D434AE06a7caaf18',
    locker,
    {
      kind: 'transparent',
    },
  );

  await proxy.deployed();

  console.log('OnxLocker upgraded:', proxy.address);
};

func.tags = ['OnxLockerUpgradeRopsten'];

export default func;
